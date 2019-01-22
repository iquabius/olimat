import ApolloClient from 'apollo-client';
import cookie from 'cookie';
import gql from 'graphql-tag';
import { FormEventHandler } from 'react';
import { compose, FetchResult, graphql, MutationFn, NamedProps, withApollo } from 'react-apollo';

import redirect from '../../utils/redirect';

export const loginMutation = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface Props {
  children: (connectorProps: { handleSignIn: FormEventHandler }) => JSX.Element;
  handleSignIn: FormEventHandler;
}

const LoginConnector: React.FunctionComponent<Props> = ({ children, handleSignIn }) =>
  children({ handleSignIn });

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
    // Use an unambiguous name for use in the `props` section below
    name: 'signinWithEmail',
    // Apollo's way of injecting new props which are passed to the component
    props: ({
      signinWithEmail,
      // `client` is provided by the `withApollo` HOC
      ownProps: { client },
    }: NamedProps<{ signinWithEmail: MutationFn<Response, Variables> }, InputProps>) => ({
      // `signin` is the name of the prop passed to the component
      handleSignIn: event => {
        /* global FormData */
        const data = new FormData(event.target);
        console.log(data);

        event.preventDefault();
        event.stopPropagation();

        signinWithEmail({
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
