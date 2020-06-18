import { ApolloClient } from '@apollo/client';
import { NextPageContext as DefaultNextContext } from 'next';

declare module 'next' {
	interface NextPageContext extends DefaultNextContext {
		apolloClient: ApolloClient<any>;
	}
}
