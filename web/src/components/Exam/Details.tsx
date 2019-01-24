import { createStyles, Paper, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import Error from 'next/error';
import { withRouter, WithRouterProps } from 'next/router';
import React from 'react';
import compose from 'recompose/compose';

import ExamDetailsConnector from './DetailsConnector';
import ExamQuestionItem from './QuestionItem';

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

const ExamDetails: React.FunctionComponent<Props> = ({ classes, router }) => {
  const id = router.query.id as string;
  if (!id) return <Error statusCode={404} />;

  return (
    <ExamDetailsConnector id={id}>
      {({ exam }) => {
        if (!exam) return <div>Essa prova não existe.</div>;

        return (
          <Paper className={classes.root}>
            <Typography className={classes.title} variant="h6">
              {exam.title}
            </Typography>
            <div className={classes.questionList} data-testid="questionList">
              {exam.questions.map((question, index) => (
                <ExamQuestionItem
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
    </ExamDetailsConnector>
  );
};

export default compose(
  withRouter,
  withStyles(styles),
)(ExamDetails);
