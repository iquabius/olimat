import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import cookie from 'cookie';
import gql from 'graphql-tag';
import React from 'react';
import { compose, graphql, withApollo } from 'react-apollo';

import redirect from '../../utils/redirect';
import Link from '../Link';

const styles = theme => ({
  signUpBox: {
    position: 'relative',
    width: 350,
    // maxHeight: 390,
    padding: theme.spacing.unit * 4,
  },
  signUpHead: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  passwordInput: {
    height: 'inherit',
  },
  signUpButton: {
    marginTop: theme.spacing.unit * 2,
  },
  helpMessage: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SignUpForm extends React.Component {
  state = {
    password: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.signUpBox}>
        <Typography className={classes.signUpHead} variant="h5">
          Crie uma conta!
        </Typography>
        <Divider />
        <form onSubmit={this.props.createUser}>
          <TextField
            id="name"
            name="name"
            label="Nome"
            margin="normal"
            fullWidth
            onChange={this.handleChange('name')}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            margin="normal"
            fullWidth
            onChange={this.handleChange('email')}
          />
          <TextField
            id="confirmEmail"
            name="confirmEmail"
            label="Confirmar email"
            margin="normal"
            fullWidth
            onChange={this.handleChange('confirmEmail')}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              id="password"
              name="password"
              inputProps={{ className: classes.passwordInput }}
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{ width: 'auto' }}
                    onClick={this.handleClickShowPasssword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            aria-label="Criar conta"
            className={classes.signUpButton}
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
          >
            Criar conta
          </Button>
        </form>
        <Typography className={classes.helpMessage} variant="caption" align="center">
          Já possui uma conta?{' '}
          <Link variant="primary" href="/login">
            Faça login aqui.
          </Link>
        </Typography>
      </Paper>
    );
  }
}

export default compose(
  withStyles(styles),
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  graphql(
    // The `createUser` & `signinUser` mutations are provided by graph.cool by
    // default.
    // Multiple mutations are executed by graphql sequentially
    gql`
      mutation Create($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
          token
        }
      }
    `,
    {
      // Use an unambiguous name for use in the `props` section below
      name: 'createWithEmail',
      // Apollo's way of injecting new props which are passed to the component
      props: ({
        createWithEmail,
        // `client` is provided by the `withApollo` HOC
        ownProps: { client },
      }) => ({
        // `createUser` is the name of the prop passed to the component
        createUser: event => {
          /* global FormData */
          const data = new FormData(event.target);

          event.preventDefault();
          event.stopPropagation();

          createWithEmail({
            variables: {
              email: data.get('email'),
              password: data.get('password'),
              name: data.get('name'),
            },
          })
            .then(({ data: { signup: { token } } }) => {
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
    },
  ),
)(SignUpForm);
