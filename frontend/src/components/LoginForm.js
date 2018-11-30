import React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import cookie from 'cookie';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Input, InputLabel, InputAdornment } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FormControl, FormGroup, FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from './Link';
import redirect from '../utils/redirect';

const styles = theme => ({
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
  passwordInput: {
    height: 'inherit',
  },
  loginButton: {
    marginTop: theme.spacing.unit * 2,
  },
  helpMessage: {
    marginTop: theme.spacing.unit * 2,
  },
});

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
    keepLoggedIn: false,
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

  handleCheckbox = event => {
    this.setState({ keepLoggedIn: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.loginBox}>
        <Typography className={classes.loginHead} variant="h5">
          Acesse sua Conta
        </Typography>
        <Divider />
        <form onSubmit={this.props.signin}>
          <TextField
            name="email"
            label="Email"
            margin="normal"
            fullWidth
            onChange={this.handleChange('email')}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
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
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
  checked={this.state.keepLoggedIn}
  onChange={this.handleCheckbox}
  value="keepLoggedIn"
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
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
          >
            Entrar
          </Button>
        </form>
        <Typography className={classes.helpMessage} variant="caption" align="center">
          Ainda não tem uma conta?{' '}
          <Link variant="primary" href="/criar_conta">
            Crie a sua aqui.
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
    // The `login` mutation is provided by the backend
    gql`
      mutation Signin($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    {
      // Use an unambiguous name for use in the `props` section below
      name: 'signinWithEmail',
      // Apollo's way of injecting new props which are passed to the component
      props: ({
        signinWithEmail,
        // `client` is provided by the `withApollo` HOC
        ownProps: { client },
      }) => ({
        // `signin` is the name of the prop passed to the component
        signin: event => {
          /* global FormData */
          const data = new FormData(event.target);
          console.log(data);

          event.preventDefault();
          event.stopPropagation();

          signinWithEmail({
            variables: {
              email: data.get('email'),
              password: data.get('password'),
            },
          })
            .then(({ data: { login: { token } } }) => {
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
)(LoginForm);
