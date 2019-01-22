import { createStyles, Paper, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import Error from 'next/error';
import { withRouter, WithRouterProps } from 'next/router';
import React from 'react';
import compose from 'recompose/compose';

import TestDetailsConnector from './DetailsConnector';
import TestQuestionItem from './QuestionItem';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    title: {
      padding: theme.spacing.unit,
      textAlign: 'center',
    },
    questionList: {
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      maxHeight: 2000,
    },
    question: {
      // Sempre que usarmos as propriedades 'padding' e 'width' juntas, é bom
      // adicionar "boxSizing: 'border-box'", para que a matemática fique o
      // mais simples possível.
      // boxSizing: 'border-box',
      // padding: theme.spacing.unit,
      width: '49.5%',
    },
  });

interface Props extends WithRouterProps, WithStyles<typeof styles> {}

const TestDetails: React.FunctionComponent<Props> = ({ classes, router }) => {
  const id = router.query.id;
  if (!id) return <Error statusCode={404} />;

  return (
    <TestDetailsConnector id={id}>
      {({ test }) => {
        if (!test) return <div>Essa prova não existe.</div>;

        return (
          <Paper className={classes.root}>
            <Typography className={classes.title} variant="h6">
              {test.title}
            </Typography>
            <div className={classes.questionList} data-testid="questionList">
              {test.questions.map((question, index) => (
                <TestQuestionItem
                  key={question.id}
                  questionNumber={index + 1}
                  className={classes.question}
                  question={question}
                />
              ))}
            </div>
          </Paper>
        );
      }}
    </TestDetailsConnector>
  );
};

export default compose(
  withRouter,
  withStyles(styles),
)(TestDetails);
