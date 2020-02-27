import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import Link from './Link';

const styleSheet = theme => ({
  root: {
    overflow: 'auto',
  },
  layout: {
    padding: theme.spacing(6),
  },
  list: {
    margin: 0,
    paddingLeft: 0,
    listStyle: 'none',
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
});

const AppFooter = props => {
  const { classes } = props;

  return (
    <footer className={classes.root}>
      <div className={classes.layout}>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link href="https://github.com/mui-org/material-ui">GitHub</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="https://twitter.com/MaterialUI">Twitter</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="https://github.com/mui-org/material-ui/tree/v1-beta/examples">
                    Examples
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link href="/discover-more/community">Community</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="/discover-more/roadmap">Roadmap</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="/discover-more/team">Team</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Typography>
      </div>
    </footer>
  );
};

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AppFooter);
