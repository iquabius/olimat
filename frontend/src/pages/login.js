import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import Head from 'next/head';
import OnlyFormFrame from '../components/OnlyFormFrame';
import LoginForm from '../components/LoginForm';
import withRoot from '../utils/withRoot';
import withData from '../utils/withData';
import checkLoggedIn from '../utils/checkLoggedIn';
import redirect from '../utils/redirect';

function PageLogin(props) {
  return (
    <OnlyFormFrame>
      <Head>
        <title>Login - OliMAT</title>
      </Head>
      <LoginForm />
    </OnlyFormFrame>
  );
}

PageLogin.getInitialProps = async (context, apolloClient) => {
  const { loggedInUser } = await checkLoggedIn(context, apolloClient);

  // if (loggedInUser.user) {
  if (loggedInUser.me) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(context, '/');
  }

  return {};
};

export default compose(
  withRoot,
  // withData gives us server-side graphql queries before rendering
  // withData,
)(PageLogin);
