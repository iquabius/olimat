import { Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NProgressBar from '@material-ui/docs/NProgressBar';
import LightbulbFullIcon from '@material-ui/docs/svgIcons/LightbulbFull';
import LightbulbOutlineIcon from '@material-ui/docs/svgIcons/LightbulbOutline';
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'react-apollo';
import fromRenderProps from 'recompose/fromRenderProps';

import AppDrawer from './AppDrawer';
import PageContext from './PageContext';
import PageTitle from './PageTitle';
import UserMenuAppBar from './UserMenuAppBar';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

class AppFrame extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  render() {
    const { children, classes, uiTheme } = this.props;

    return (
      <PageTitle>
        {title => {
          let disablePermanent = false;
          let navIconClassName = '';
          let appBarClassName = classes.appBar;

          if (title === null) {
            // home route, don't shift app bar or dock drawer
            disablePermanent = true;
            appBarClassName += ` ${classes.appBarHome}`;
          } else {
            navIconClassName = classes.navIconHide;
            appBarClassName += ` ${classes.appBarShift}`;
          }
          // Disable box-shadow for pages wrapped by AppContent.
          // Those pages have a breadcrumb box.
          // if (RegExp('admin').test(activePage.pathname)) {
          //   appBarClassName += ` ${classes.appBarHome}`;
          // }

          return (
            <div className={classes.root}>
              <NProgressBar />
              <AppBar className={appBarClassName}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    className={navIconClassName}
                  >
                    <MenuIcon />
                  </IconButton>
                  {title !== null && (
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                      {title}
                    </Typography>
                  )}
                  <div className={classes.grow} />
                  <Tooltip title="Alternar tema claro/escuro" enterDelay={300}>
                    <IconButton
                      color="inherit"
                      onClick={uiTheme.handleTogglePaletteType}
                      aria-label="Alternar tema claro/escuro"
                    >
                      {uiTheme.paletteType === 'light' ? (
                        <LightbulbOutlineIcon />
                      ) : (
                        <LightbulbFullIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <UserMenuAppBar />
                </Toolbar>
              </AppBar>
              <AppDrawer
                className={classes.drawer}
                disablePermanent={disablePermanent}
                onClose={this.handleDrawerClose}
                onOpen={this.handleDrawerOpen}
                mobileOpen={this.state.mobileOpen}
              />
              {children}
            </div>
          );
        }}
      </PageTitle>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  uiTheme: PropTypes.shape({
    handleTogglePaletteType: PropTypes.func.isRequired,
    paletteType: PropTypes.string.isRequired,
  }).isRequired,
};

const pageContext = fromRenderProps(PageContext.Consumer, ({ uiTheme }) => ({ uiTheme }));

export default compose(
  pageContext,
  withStyles(styles, { name: 'AppFrame' }),
)(AppFrame);
