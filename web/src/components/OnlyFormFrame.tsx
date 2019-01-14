import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  loginContent: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfBg: {
    height: '100vh',
    backgroundColor: theme.palette.grey[300],
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    '& div': {
      backgroundColor: theme.palette.primary.main,
      height: '50vh',
    },
  },
  logo: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.contrastText,
    '& h1': {
      fontSize: theme.typography.display1.fontSize,
      fontWeight: 400,
    },
  },
});

const OnlyFormFrame = props => {
  const { children, classes } = props;
  return (
    <React.Fragment>
      <section className={classes.halfBg}>
        <div />
      </section>
      <section className={classes.loginContent}>
        <div className={classes.logo}>
          <h1>OliMAT</h1>
        </div>
        {children}
      </section>
    </React.Fragment>
  );
};

OnlyFormFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OnlyFormFrame);
