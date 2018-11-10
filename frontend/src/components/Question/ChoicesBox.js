import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  choicesBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit * 2,
    marginBottom: -2,
  },
  option: {
    ...theme.typography.body1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  dense: {
    width: 250,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: theme.spacing.unit / 3,
  },
  optionLabel: {
    fontWeight: 'bold',
  },
});

const optionLabels = ['a', 'b', 'c', 'd', 'e', 'f'];

const ChoicesBox = ({ choices, dense, classes }) => {
  const optionClassName = dense ? classNames(classes.option, classes.dense) : classes.option;
  return (
    <div className={classes.choicesBox}>
      {choices.map((choice, index) => (
        <div key={choice.id} className={optionClassName}>
          <span className={classes.optionLabel}>{`${optionLabels[index]}) `}</span>
          {`${choice.text}`}
        </div>
      ))}
    </div>
  );
};

ChoicesBox.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  classes: PropTypes.object.isRequired,
  dense: PropTypes.bool,
};

export default withStyles(styles)(ChoicesBox);
