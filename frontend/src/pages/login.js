import React from 'react';
import PropTypes from 'prop-types';
import withRoot from '../utils/withRoot';
import { withStyles } from 'material-ui/styles';
import Head from 'next/head';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControl, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import AppContent from '../components/AppContent';
// import Link from '../components/Link';

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
  loginBox: {
    position: 'relative',
    width: 350,
    maxHeight: 390,
    padding: theme.spacing.unit * 4,
  },
  loginHead: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: theme.spacing.unit * 2,
  }
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
      <Paper className={classes.loginBox}>
        <Typography className={classes.loginHead} variant="headline">
          Acesse sua Conta
        </Typography>
        <Divider />
        <TextField
          label="Email"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Senha"
          margin="normal"
          fullWidth
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={false}
                onChange={() => console.log('Switch clicked!')}
                value="checkedB"
                color="primary"
              />
            }
            label="Manter acesso"
          />
        </FormGroup>
        {/* <Typography variant="caption">
          <Link href="#">Esqueceu a senha?</Link>
        </Typography> */}
        <Button
          className={classes.loginButton}
          fullWidth 
          variant="raised"
          color="secondary"
          size="large"
        >
          Entrar
        </Button>
      </Paper>
    </section>
  </React.Fragment>
)};

PageLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(PageLogin));
