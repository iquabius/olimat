import {
	ApolloClient,
	ApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import Head from 'next/head';
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';

import { parseCookies } from './helpers';
import initApollo from './initApollo';

// Gets the display name of a JSX component for dev tools
const getDisplayName = ({ displayName, name }) =>
	displayName || name || 'Unknown';

export interface WithDataProps {
	apolloState: NormalizedCacheObject;
}

/**
 * SSR is not working after moving to hooks api. We could try to update this
 * HoC: https://github.com/vercel/next.js/pull/9516.
 * Or try upgrading "@apollo/react-ssr": "^4.0.0-beta.1".
 * https://github.com/apollographql/react-apollo/issues/3678#issuecomment-579359439
 * DONE: This is getting the data and sending it through __NEXT_DATA__, but the
 * HTML is still being rendered with the loading state on SSR.
 * The problem may be that `loading` is still true after the `data` is fetched:
 * https://github.com/apollographql/react-apollo/issues/3678#issuecomment-630075090.
 *
 * Or try getMarkupFromTree:
 * https://github.com/apollographql/react-apollo/issues/3251#issuecomment-513223453
 *
 * We should also change it to work for PageComponents instead of App. This way
 * we can take advantage of static optimizationi n Next.js version 9.
 * https://github.com/vercel/next.js/issues/9503
 */
export default App => {
	return class WithData extends React.Component<WithDataProps> {
		static displayName = `WithData(${getDisplayName(App)})`;

		static async getInitialProps(ctx) {
			const {
				AppTree,
				ctx: { req, res },
			} = ctx;
			console.log('WithData.getInitialProps() -> ctx: ', Object.keys(ctx));
			console.log('WithData.getInitialProps() -> router:', {
				pathname: ctx.router.pathname,
			});

			// One-time-use apollo client for initial props and rendering (on server)
			const apollo = initApollo(
				{},
				{ getToken: () => parseCookies(req).token },
			);
			ctx.ctx.apolloClient = apollo;

			let appProps = {};
			if (App.getInitialProps) {
				appProps = await App.getInitialProps(ctx);
			}
			console.log('WithData -> appProps: ', Object.keys(appProps));

			// When redirecting, the response is finished. No point in continuing to render.
			if (res && res.finished) {
				return {};
			}

			// Run all GraphQL queries in the component tree and extract the resulting data
			if (!process.browser) {
				try {
					// Run all GraphQL queries
					const app = (
						<ApolloProvider client={apollo}>
							<AppTree
								{...appProps}
								// I think we don't need to pass apolloClient here since we
								// don't use it in OliApp.render()
								apolloClient={apollo}
							/>
						</ApolloProvider>
					);
					console.log('Awaiting getDataFromTree()...');
					await getDataFromTree(app);
				} catch (error) {
					// Prevent Apollo Client GraphQL errors from crashing SSR.
					// Handle them in components via the data.error prop:
					// http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
					console.error('Error while running `getDataFromTree`', error);
				}

				// getDataFromTree does not call componentWillUnmount
				// head side effect therefore need to be cleared manually
				Head.rewind();
			}

			// Extract query data from the Apollo's store
			const apolloState = apollo.cache.extract();
			console.log('getDataFromTree() finished -> data extracted');

			return {
				apolloState,
				...appProps,
			};
		}

		apolloClient: ApolloClient<any>;

		constructor(props) {
			super(props);
			// Note: Apollo should never be used on the server side beyond the initial
			// render within `getInitialProps()` above (since the entire prop tree
			// will be initialized there), meaning the below will only ever be
			// executed on the client.
			this.apolloClient = initApollo(props.apolloState, {
				getToken: process.browser
					? () => parseCookies().token
					: () => undefined,
			});
		}

		render() {
			console.log('WithData.render()');
			return (
				<ApolloProvider client={this.apolloClient}>
					<App {...this.props} />
				</ApolloProvider>
			);
		}
	};
};
