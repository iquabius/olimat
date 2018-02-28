import React from 'react';
import PropTypes from 'prop-types';
import withRoot from '../utils/withRoot';
import { withStyles } from 'material-ui/styles';
import Head from 'next/head';
import LoginForm from '../components/LoginForm';

const styles = theme => ({
  loginContent: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfBg: {
    height: '100vh',
    backgroundColor: theme.palette.grey[300],
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    '& div': {
      backgroundColor: theme.palette.primary.main,
      height: '50vh',
    }
  },
  logo: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.contrastText,
    '& h1': {
      fontSize: theme.typography.display1.fontSize,
      fontWeight: 400,
    }
  },
});

function PageLogin(props) {
  const { classes } = props;
  return (
  <React.Fragment>
    <Head>
      <title>Login - OliMAT</title>
    </Head>
    <section className={classes.halfBg}>
      <div></div>
    </section>
    <section className={classes.loginContent}>
      <div className={classes.logo}>
        <h1>OliMAT</h1>
      </div>
      <LoginForm />
    </section>
  </React.Fragment>
)};

PageLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(PageLogin));
