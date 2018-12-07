import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import ChoicesBox from '../Question/ChoicesBox';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { StyleRules } from '@material-ui/core/styles/withStyles';

/**
 * This callback function is used to create the styles
 * @param {Theme} theme Material-UI theme
 * @return {StyleRules}
 */
const styles = theme => ({
  root: {
    textAlign: 'justify',
    padding: theme.spacing.unit * 2,
  },
  questionNumber: {
    fontWeight: 'bold',
  },
  questionImg: {
    width: '100%',
  },
  choices: {
    marginBottom: theme.spacing.unit * 4,
  },
});

const TestQuestionItem = ({ className, classes, number, question }) => (
  <div className={classNames(classes.root, className)}>
    <Typography gutterBottom paragraph>
      <span className={classes.questionNumber}>{`Questão ${number}) `}</span>
      {question.wording}
    </Typography>
    {question.imageFullUrl && (
      <img className={classes.questionImg} src={question.imageFullUrl} alt="Imagem da questão" />
    )}
    {question.choices &&
      question.choices.length > 0 && (
        <ChoicesBox choices={question.choices} className={classes.choices} />
      )}
  </div>
);

export default withStyles(styles)(TestQuestionItem);
