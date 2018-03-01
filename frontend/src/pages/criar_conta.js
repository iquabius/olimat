import React from 'react';
import PropTypes from 'prop-types';
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

PageSignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(PageSignUp);
