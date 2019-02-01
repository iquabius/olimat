import { NextFunctionComponent } from 'next';
import Head from 'next/head';
import React from 'react';

import OnlyFormFrame from '../components/OnlyFormFrame';
import SignUpForm from '../components/User/SignUpForm';
import checkLoggedIn from '../utils/checkLoggedIn';
import redirect from '../utils/redirect';

const PageSignUp: NextFunctionComponent = () => {
  return (
    <OnlyFormFrame>
      <Head>
        <title>Criar conta - OliMAT</title>
      </Head>
      <SignUpForm />
    </OnlyFormFrame>
  );
};

PageSignUp.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(context, '/');
  }

  return {};
};

export default PageSignUp;
