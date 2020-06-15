import cookie from 'cookie';
import { ApolloClient, gql, FetchResult, useMutation } from '@apollo/client';
import { FormEventHandler } from 'react';
import { withApollo } from '@apollo/react-hoc';
import { compose } from 'recompose';
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
	client: ApolloClient<any>;
}

const LoginConnector: React.FunctionComponent<LoginConnectorProps> = ({
	children,
	client,
}) => {
	const [tryToLogin, {}] = useMutation<Response, Variables>(loginMutation);

	const handleSignIn: FormEventHandler = event => {
		/* global FormData */
		const data = new FormData(event.target as HTMLFormElement);

		event.preventDefault();
		event.stopPropagation();

		tryToLogin({
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
				console.log('Successful login!');
			})
			.catch(error => {
				// Something went wrong, such as incorrect password, or no network
				// available, etc.
				console.error(error);
			});
	};

	return children({ handleSignIn });
};

interface Response {
	login: {
		token: string;
	};
}

interface Variables {
	email: string;
	password: string;
}

export default compose(
	// withApollo exposes `client` prop used when logging out
	withApollo,
)(LoginConnector);
