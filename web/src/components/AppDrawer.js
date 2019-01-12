import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './Link';
import { pageToTitle } from '../utils/helpers';
import PageContext from './PageContext';

/**
 * This callback function is used to create the styles
 * @param {Theme} theme Material-UI theme
 */
const styles = ({ palette }) => ({
  paper: {
    width: 250,
    backgroundColor: palette.background.paper,
  },
  title: {
    color: palette.text.secondary,
    '&:hover': {
      color: palette.type === 'light' ? palette.primary.main : palette.primary.light,
      textDecoration: 'none',
    },
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchor: {
    color: palette.text.secondary,
  },
});

// eslint-disable-next-line react/prop-types
function renderNavItems({ pages, ...params }) {
  return (
    <List>
      {pages.reduce(
        // eslint-disable-next-line no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        [],
      )}
    </List>
  );
}

function reduceChildRoutes({ props, activePage, items, page, depth }) {
  if (page.displayNav === false) {
    return items;
  }

  if (page.children && page.children.length > 1) {
    const title = pageToTitle(page);
    const openImmediately = activePage.pathname.indexOf(`${page.pathname}/`) === 0;

    items.push(
      <AppDrawerNavItem depth={depth} key={title} openImmediately={openImmediately} title={title}>
        {renderNavItems({ props, pages: page.children, activePage, depth: depth + 1 })}
      </AppDrawerNavItem>,
    );
  } else {
    const title = pageToTitle(page);
    page = page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppDrawerNavItem
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        onClick={props.onClose}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

function AppDrawer(props) {
  const { classes, className, disablePermanent, mobileOpen, onClose, onOpen } = props;

  const drawer = (
    <PageContext.Consumer>
      {({ activePage, pages }) => (
        <div className={classes.nav}>
          <div className={classes.toolbarIe11}>
            <Toolbar className={classes.toolbar}>
              <Link className={classes.title} href="/" onClick={onClose}>
                <Typography variant="h3" color="inherit">
                  OliMAT
                </Typography>
              </Link>
              <Divider absolute />
            </Toolbar>
          </div>
          {renderNavItems({ props, pages, activePage, depth: 0 })}
        </div>
      )}
    </PageContext.Consumer>
  );

  return (
    <nav className={className}>
      <Hidden lgUp={!disablePermanent} implementation="js">
        <SwipeableDrawer
          classes={{
            paper: classNames(classes.paper, 'algolia-drawer'),
          }}
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      {disablePermanent ? null : (
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.paper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      )}
    </nav>
  );
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppDrawer);
