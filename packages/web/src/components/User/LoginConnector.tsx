import ApolloClient from 'apollo-client';
import cookie from 'cookie';
import gql from 'graphql-tag';
import { FormEventHandler } from 'react';
import { graphql, withApollo } from '@apollo/react-hoc';
import { compose } from 'recompose';
import { FetchResult } from '@apollo/client';
import redirect from '@olimat/web/utils/redirect';

export const loginMutation = gql`
	mutation loginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

export interface LoginConnectorProps {
	children: (connectorProps: { handleSignIn: FormEventHandler }) => JSX.Element;
	handleSignIn: FormEventHandler;
}

const LoginConnector: React.FunctionComponent<LoginConnectorProps> = ({
	children,
	handleSignIn,
}) => children({ handleSignIn });

interface Response {
	login: {
		token: string;
	};
}

interface Variables {
	email: string;
	password: string;
}

interface InputProps {
	client: ApolloClient<any>;
}

export default compose(
	// withApollo exposes `this.props.client` used when logging out
	withApollo,
	graphql<InputProps, Response, Variables, {}>(loginMutation, {
		// Apollo's way of injecting new props which are passed to the component
		props: ({
			mutate,
			// `client` is provided by the `withApollo` HOC
			ownProps: { client },
		}) => ({
			// `handleSignIn` is the name of the prop passed to the component
			handleSignIn: event => {
				/* global FormData */
				const data = new FormData(event.target);
				console.log(data);

				event.preventDefault();
				event.stopPropagation();

				mutate({
					variables: {
						email: data.get('email').toString(),
						password: data.get('password').toString(),
					},
				})
					.then(({ data: { login: { token } } }: FetchResult<Response>) => {
						// Store the token in cookie
						document.cookie = cookie.serialize('token', token, {
							maxAge: 30 * 24 * 60 * 60, // 30 days
						});

						// Force a reload of all the current queries now that the user is
						// logged in
						client.resetStore().then(() => {
							// Now redirect to the homepage
							redirect({}, '/');
						});
					})
					.catch(error => {
						// Something went wrong, such as incorrect password, or no network
						// available, etc.
						console.error(error);
					});
			},
		}),
	}),
)(LoginConnector);
