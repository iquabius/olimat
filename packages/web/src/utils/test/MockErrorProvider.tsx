import {
	InMemoryCache,
	ApolloClient,
	ApolloLink,
	Observable,
} from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloProvider } from '@apollo/react-components';

const MockErrorProvider = ({ children, graphqlErrors }) => {
	const defaultError = 'Unspecified error from MockErrorProvider.';
	const tip =
		" The 'graphqlErrors' prop must be an array with at least one" +
		' error object to override the default error message.';
	const defaultErrors = [{ message: defaultError + tip }];
	// This is just a link that swallows all operations and returns the same thing
	// for every request: The specified error.
	const link = new ApolloLink(operation => {
		return new Observable(observer => {
			observer.next({
				// Wait until we remove @apollo/react-hoc and @apollo/react-components
				// @ts-ignore
				errors:
					graphqlErrors && graphqlErrors.length > 0
						? graphqlErrors
						: defaultErrors,
			});
			observer.complete();
		});
	});

	const client = new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});

	// Wait until we remove @apollo/react-hoc and @apollo/react-components
	// @ts-ignore
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

MockErrorProvider.propTypes = {
	children: PropTypes.node.isRequired,
	graphqlErrors: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default MockErrorProvider;
