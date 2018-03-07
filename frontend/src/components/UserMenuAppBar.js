import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Link from '../components/Link';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui';
import cookie from 'cookie';
import { withApollo } from 'react-apollo';
import redirect from '../utils/redirect';

class UserMenuAppBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1, // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged out, so we don't accidentally leave any state around.
    this.props.client.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/login');
    });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    if (this.context.loggedInUser.me) {
      return (
        <div>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
            <MenuItem onClick={this.handleClose}>Minha Conta</MenuItem>
            <MenuItem onClick={this.logout}>Sair</MenuItem>
          </Menu>
        </div>
      );
    }
    return (
      <Button
        color="inherit"
        component={buttonProps => <Link variant="button" prefetch href="/login" {...buttonProps} />}
      >
        Login
      </Button>
    );
  }
}

UserMenuAppBar.contextTypes = {
  loggedInUser: PropTypes.object,
};

export default withApollo(UserMenuAppBar);
