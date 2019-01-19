import { createStyles, Theme, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // Remove list-style e padding padrão da tag 'ul'
      listStyle: 'none',
      padding: 0,
      // Layout com flexBox
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginBottom: -2,
    },
    option: {
      ...theme.typography.body2,
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

const ChoicesBox = ({ choices, dense, classes, className }) => {
  const optionClassName = dense ? classNames(classes.option, classes.dense) : classes.option;
  return (
    <ul className={classNames(classes.root, className)}>
      {choices.map((choice, index) => (
        <li key={choice.id} className={optionClassName}>
          <span className={classes.optionLabel}>{`${optionLabels[index]}) `}</span>
          {`${choice.text}`}
        </li>
      ))}
    </ul>
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
