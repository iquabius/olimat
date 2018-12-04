import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql, withApollo } from 'react-apollo';
import cookie from 'cookie';
import redirect from '../../utils/redirect';

export const loginMutation = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginConnector = ({ children, handleSignIn }) => children({ handleSignIn });

LoginConnector.propTypes = {
  children: PropTypes.func.isRequired,
  handleSignIn: PropTypes.func.isRequired,
};

export default compose(
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  graphql(loginMutation, {
    // Use an unambiguous name for use in the `props` section below
    name: 'signinWithEmail',
    // Apollo's way of injecting new props which are passed to the component
    props: ({
      signinWithEmail,
      // `client` is provided by the `withApollo` HOC
      ownProps: { client },
    }) => ({
      // `signin` is the name of the prop passed to the component
      handleSignIn: event => {
        /* global FormData */
        const data = new FormData(event.target);
        console.log(data);

        event.preventDefault();
        event.stopPropagation();

        signinWithEmail({
          variables: {
            email: data.get('email'),
            password: data.get('password'),
          },
        })
          .then(({ data: { login: { token } } }) => {
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
