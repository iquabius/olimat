import React from 'react';
import { compose } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Input,
  InputLabel,
  InputAdornment,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '../Link';
import LoginConnector from './LoginConnector';
import { fromRenderProps } from 'recompose';

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
    this.setState(state => ({
      showPassword: !state.showPassword,
    }));
  };

  handleCheckbox = event => {
    this.setState({ keepLoggedIn: event.target.checked });
  };

  render() {
    const { classes, handleSignIn } = this.props;
    const showPasswordAdornment = (
      <InputAdornment position="end">
        <IconButton
          style={{ width: 'auto' }}
          onClick={this.handleClickShowPasssword}
          onMouseDown={this.handleMouseDownPassword}
        >
          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
    const keepLoggedInSwitch = (
      <Switch
        checked={this.state.keepLoggedIn}
        onChange={this.handleCheckbox}
        value="keepLoggedIn"
        color="primary"
      />
    );

    return (
      <Paper className={classes.loginBox}>
        <Typography className={classes.loginHead} variant="h5">
          Acesse sua Conta
        </Typography>
        <Divider />
        <form onSubmit={handleSignIn}>
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
              endAdornment={showPasswordAdornment}
            />
          </FormControl>
          <FormGroup row>
            <FormControlLabel control={keepLoggedInSwitch} label="Manter acesso" />
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

const loginConnector = fromRenderProps(LoginConnector, ({ handleSignIn }) => ({ handleSignIn }));

export default compose(
  loginConnector,
  withStyles(styles),
)(LoginForm);
