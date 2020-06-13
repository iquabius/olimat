import ApolloClient from 'apollo-client';
import { NextContext as DefaultNextContext } from 'next';

// Extends default NextContext to include apolloClient
declare module 'next' {
	interface NextContext extends DefaultNextContext {
		apolloClient: ApolloClient<any>;
	}
}
