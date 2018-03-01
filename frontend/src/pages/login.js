import React from 'react';
import PropTypes from 'prop-types';
import withRoot from '../utils/withRoot';
import Head from 'next/head';
import OnlyFormFrame from '../components/OnlyFormFrame';
import LoginForm from '../components/LoginForm';

function PageLogin(props) {
  return (
    <OnlyFormFrame>
      <Head>
        <title>Login - OliMAT</title>
      </Head>
      <LoginForm />
    </OnlyFormFrame>
  );
};

PageLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(PageLogin);
