import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { FormControl, FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
// import Link from '../components/Link';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

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
  loginButton: {
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
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.loginBox}>
        <Typography className={classes.loginHead} variant="headline">
          Acesse sua Conta
        </Typography>
        <Divider />
        <TextField
          label="Email"
          margin="normal"
          fullWidth
          onChange={this.handleChange('email')}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Senha</InputLabel>
          <Input
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{width: 'auto'}}
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
          variant="raised"
          color="secondary"
          size="large"
        >
          Entrar
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginForm);
