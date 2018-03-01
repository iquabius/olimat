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
import Link from '../components/Link';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

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
    name: '',
    email: '',
    confirmEmail: '',
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
        <Typography className={classes.signUpHead} variant="headline">
          Crie uma conta!
        </Typography>
        <Divider />
        <TextField
          label="Nome"
          margin="normal"
          fullWidth
          onChange={this.handleChange('name')}
        />
        <TextField
          label="Email"
          margin="normal"
          fullWidth
          onChange={this.handleChange('email')}
        />
        <TextField
          label="Confirmar email"
          margin="normal"
          fullWidth
          onChange={this.handleChange('confirmEmail')}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Senha</InputLabel>
          <Input
            inputProps={{className: classes.passwordInput}}
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
        <Button
          className={classes.signUpButton}
          fullWidth 
          variant="raised"
          color="secondary"
          size="large"
        >
          Criar conta
        </Button>
        <Typography
          className={classes.helpMessage}
          variant="caption"
          align="center"
        >
          Já possui uma conta? <Link variant="secondary" href="/login">Faça login aqui.</Link>
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(SignUpForm);
