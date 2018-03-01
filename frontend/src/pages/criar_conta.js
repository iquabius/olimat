import React from 'react';
import withRoot from '../utils/withRoot';
import Head from 'next/head';
import OnlyFormFrame from '../components/OnlyFormFrame';
import SignUpForm from '../components/SignUpForm';

function PageSignUp(props) {
  return (
    <OnlyFormFrame>
      <Head>
        <title>Criar conta - OliMAT</title>
      </Head>
      <SignUpForm />
    </OnlyFormFrame>
  );
};

export default withRoot(PageSignUp);
