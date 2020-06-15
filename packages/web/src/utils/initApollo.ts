import {
	InMemoryCache,
	NormalizedCacheObject,
	ApolloClient,
	ApolloLink,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { onError } from '@apollo/link-error';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch;
}

function create(initialState, { getToken }) {
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

	const httpLink = createHttpLink({
		// TODO: Fix this to work on intranet
		uri: 'http://localhost:4000/graphql',
		credentials: 'same-origin',
	});

	// To do this with apollo-boost:
	// https://github.com/apollographql/apollo-client/issues/3044
	const authLink = setContext((_, { headers }) => {
		const token = getToken();
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});

	const cache = new InMemoryCache().restore(initialState || {});

	return new ApolloClient({
		// Check if apollo-boost would need this for ssrMode
		connectToDevTools: process.browser,
		// apollo-boost doesn't support ssrMode
		// https://github.com/apollographql/apollo-client/issues/3335
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		link: ApolloLink.from([errorLink, authLink, httpLink]),
		cache,
	});
}

export default function initApollo(
	initialState,
	options,
): ApolloClient<NormalizedCacheObject> {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return create(initialState, options);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(initialState, options);
	}

	return apolloClient;
}
