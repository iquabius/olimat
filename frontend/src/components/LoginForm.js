import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
// import Link from '../components/Link';

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
    );
  }
}

export default withStyles(styles)(LoginForm);
