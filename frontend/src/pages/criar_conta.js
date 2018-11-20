import React from 'react';
import Head from 'next/head';
import withRoot from '../utils/withRoot';
import OnlyFormFrame from '../components/OnlyFormFrame';
import SignUpForm from '../components/SignUpForm';
import checkLoggedIn from '../utils/checkLoggedIn';
import redirect from '../utils/redirect';

function PageSignUp(props) {
  return (
    <OnlyFormFrame>
      <Head>
        <title>Criar conta - OliMAT</title>
      </Head>
      <SignUpForm />
    </OnlyFormFrame>
  );
}

PageSignUp.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(context, '/');
  }

  return {};
};

export default withRoot(PageSignUp);
