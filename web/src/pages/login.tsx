import React from 'react';
import Head from 'next/head';
import OnlyFormFrame from '../components/OnlyFormFrame';
import LoginForm from '../components/User/LoginForm';
import checkLoggedIn from '../utils/checkLoggedIn';
import redirect from '../utils/redirect';

const PageLogin = () => {
  return (
    <OnlyFormFrame>
      <Head>
        <title>Login - OliMAT</title>
      </Head>
      <LoginForm />
    </OnlyFormFrame>
  );
};

PageLogin.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(context, '/');
  }

  return {};
};

export default PageLogin;
