import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppDrawer from './AppDrawer';
// import { pageToTitle } from '../utils/helpers';
import UserMenuAppBar from './UserMenuAppBar';
import PageContext from './PageContext';
import PageTitle from './PageTitle';

// Disaply a progress bar between route transitions
NProgress.configure({
  template: `
    <div class="bar" role="bar">
      <dt></dt>
      <dd></dd>
    </div>
  `,
});

Router.onRouteChangeStart = url => {
  console.log('onRouteChangeStart');
  console.log('App is changing to: ', url);
  NProgress.start();
};

Router.onRouteChangeComplete = url => {
  console.log('onRouteChangeComplete');
  console.log('App has changed to: ', url);
  NProgress.done();
};

Router.onRouteChangeError = (err, url) => {
  console.log('onRouteChangeError');
  console.log('App has error when changing: ', err, url);
  NProgress.done();
};

const styles = theme => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        position: 'fixed',
        background:
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        borderRadius: 1,
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
      },
      '& dd, & dt': {
        position: 'absolute',
        top: 0,
        height: 2,
        boxShadow: `${
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
        } 1px 0 6px 1px`,
        borderRadius: '100%',
        animation: 'nprogress-pulse 2s ease-out 0s infinite',
      },
      '& dd': {
        opacity: 0.6,
        width: 20,
        right: 0,
        clip: 'rect(-6px,22px,14px,10px)',
      },
      '& dt': {
        opacity: 0.6,
        width: 180,
        right: -80,
        clip: 'rect(-6px,90px,14px,-6px)',
      },
    },
    '@keyframes nprogress-pulse': {
      '30%': {
        opacity: 0.6,
      },
      '60%': {
        opacity: 0,
      },
      to: {
        opacity: 0.6,
      },
    },
  },
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
    const { children, classes } = this.props;
    // const { activePage } = this.context;
    // const title = activePage.title !== false ? pageToTitle(activePage) : null;

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
};

export default withStyles(styles, { name: 'AppFrame' })(AppFrame);
