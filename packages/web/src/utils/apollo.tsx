/**
 * This integration with Apollo Client is based on the last version of the
 * with-apollo-auth example that was is the Next.js repository.
 *
 * The difference is we're wrapping the AppType from _app.tsx instead of the
 * NextPage. The integration was refactored to allow automatic static
 * optimization for pages that don't use apollo:
 *
 * - https://github.com/vercel/next.js/pull/8556
 *
 * The example was removed later in this commit:
 *
 * - https://github.com/vercel/next.js/pull/9516
 *
 * The specifc file this was based on is the following:
 *
 * https://github.com/vercel/next.js/blob/caa5347873a7162079e4c66ad0d198df8ac670f3/examples/with-apollo-auth/lib/apollo.js
 *
 * This is getting the data and sending it through __NEXT_DATA__, but
 * the HTML is still being rendered with the loading state on SSR.
 *
 * The problem is that `loading` is still true after the `data` is fetched:
 * https://github.com/apollographql/react-apollo/issues/3678#issuecomment-630075090.
 *
 * This is certainly because of the beta versions of @apollo/* we're using.
 *
 * We could try getMarkupFromTree():
 * https://github.com/apollographql/react-apollo/issues/3251#issuecomment-513223453
 */
// TODO: Refactor this to wrap NextPage and use automatic static optimization
// https://github.com/vercel/next.js/issues/9503
import http from 'http';
import React from 'react';
import Head from 'next/head';
import cookie, { CookieParseOptions } from 'cookie';
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { onError } from '@apollo/link-error';
import fetch from 'isomorphic-unfetch';
import {
	AppType,
	NextComponentType,
	AppContextType,
	AppInitialProps,
	AppPropsType,
} from 'next/dist/next-server/lib/utils';

type WithApolloAppPropsType = AppPropsType & {
	apolloClient: ApolloClient<NormalizedCacheObject>;
	apolloState: NormalizedCacheObject;
};

type WithApolloAppType = NextComponentType<
	AppContextType,
	AppInitialProps,
	WithApolloAppPropsType
>;

/**
 * Creates and provides the apolloContext
 * to a Next.js AppTree. Use it by wrapping
 * your App (_app.tsx) via HOC pattern.
 */
export const withApollo = (AppComponent: AppType) => {
	const WithApollo: WithApolloAppType = (appProps) => {
		console.log('WithApollo rendering...');

		// const { apolloClient, apolloState, ...pageProps } = pagePropsOriginal;
		const { apolloClient, apolloState } = appProps;

		const client = React.useMemo(() => {
			// We pass in the apolloClient directly when using getDataFromTree
			if (apolloClient) {
				return apolloClient;
			}

			// Otherwise initClient using apolloState
			return initApolloClient(apolloState, {
				getToken: () => {
					return parseCookies().token;
				},
			});
		}, []);

		return (
			<ApolloProvider client={client}>
				<AppComponent {...appProps} />
			</ApolloProvider>
		);
	};

	if (process.env.NODE_ENV !== 'production') {
		// Find correct display name
		const displayName =
			AppComponent.displayName || AppComponent.name || 'Unknown';

		// Set correct display name for devtools
		WithApollo.displayName = `withApollo(${displayName})`;
	}

	WithApollo.getInitialProps = async (appCtx) => {
		// If we were wrapping a NextPage...
		// const { AppTree, req, res } = pageCtx;
		// ...instead of the AppType (_app.tsx)
		const {
			AppTree,
			ctx: { req, res },
		} = appCtx;
		console.log('WithApollo.getInitialProps() -> ctx: ', Object.keys(appCtx));
		console.log('WithApollo.getInitialProps() -> router:', {
			pathname: appCtx.router.pathname,
		});

		// Run all GraphQL queries in the component tree
		// and extract the resulting data
		const apolloClient = initApolloClient(
			{},
			{
				getToken: () => parseCookies(req).token,
			},
		);
		appCtx.ctx.apolloClient = apolloClient;
		// For NextPage:
		// ctx.apolloClient = apolloClient;

		const appProps = AppComponent.getInitialProps
			? await AppComponent.getInitialProps(appCtx)
			: { pageProps: {} };

		console.log('WithApollo -> appProps: ', Object.keys(appProps));

		if (res && res.finished) {
			// When redirecting, the response is finished.
			// No point in continuing to render
			return { pageProps: {} };
		}

		// Get apolloState on the server (needed for ssr)
		if (typeof window === 'undefined') {
			try {
				// Run all GraphQL queries
				const { getDataFromTree } = await import('@apollo/react-ssr');
				// When wrapping a NextPage this should also be different:
				// https://github.com/vercel/next.js/blob/caa5347873a7162079e4c66ad0d198df8ac670f3/examples/with-apollo-auth/lib/apollo.js#L82-L86
				await getDataFromTree(
					<AppTree {...appProps} apolloClient={apolloClient} />,
				);
			} catch (error) {
				// Prevent Apollo Client GraphQL errors from crashing SSR.
				// Handle them in components via the data.error prop:
				// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
				console.error('Error while running `getDataFromTree`', error);
			}

			// getDataFromTree does not call componentWillUnmount
			// head side effect therefore need to be cleared manually
			Head.rewind();
		}

		// Extract query data from the Apollo store
		const apolloState = apolloClient.cache.extract();

		return {
			...appProps,
			apolloState,
		};
	};

	return WithApollo;
};

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

interface ApolloClientCreateOptions {
	getToken: () => string;
}

/**
 * Always creates a new apollo client on the server.
 * Creates or reuses apollo client in the browser.
 */
const initApolloClient = (
	initialState: NormalizedCacheObject,
	options: ApolloClientCreateOptions,
): ApolloClient<NormalizedCacheObject> => {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (typeof window === 'undefined') {
		return createApolloClient(initialState, options);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = createApolloClient(initialState, options);
	}

	return apolloClient;
};

/**
 * Creates and configures the ApolloClient
 */
const createApolloClient = (
	initialState: NormalizedCacheObject = {},
	{ getToken }: ApolloClientCreateOptions,
) => {
	const fetchOptions = {};

	// If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
	// 'https-proxy-agent' is required here because it's a sever-side only module
	// if (typeof window === 'undefined') {
	//   if (process.env.https_proxy) {
	//     fetchOptions.agent = new (require('https-proxy-agent'))(
	//       process.env.https_proxy
	//     )
	//   }
	// }

	const httpLink = new HttpLink({
		// TODO: Fix this to work on intranet
		uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
		credentials: 'same-origin',
		fetch,
		fetchOptions,
	});

	const authLink = setContext((_, { headers }) => {
		const token = getToken();
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});

	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
				),
			);
		}
		if (networkError) console.log(`[Network error]: `, networkError);
	});

	// Check out https://github.com/zeit/next.js/pull/4611 if you want
	// to use the AWSAppSyncClient
	const isBrowser = typeof window !== 'undefined';
	return new ApolloClient({
		connectToDevTools: isBrowser,
		// Disables forceFetch on the server (so queries are only run once)
		ssrMode: !isBrowser,
		link: ApolloLink.from([errorLink, authLink, httpLink]),
		cache: new InMemoryCache().restore(initialState),
	});
};

/**
 * Cookie parser that works on the
 * server and on the client
 */
const parseCookies = (
	req?: http.IncomingMessage,
	options?: CookieParseOptions,
) => {
	return cookie.parse(
		req ? req.headers.cookie || '' : document.cookie,
		options,
	);
};
