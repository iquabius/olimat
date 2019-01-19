import {
  createStyles,
  Paper,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Error from 'next/error';
import NextLink from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'recompose/compose';

import FAButton from '../FAButton';
import SafeDeleteIconButton from '../SafeDeleteIconButton';

import ChoicesBox from './ChoicesBox';
import QuestionDetailsConnector from './DetailsConnector';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    actions: {
      display: 'flex',
    },
    toolbar: {
      borderBottom: '1px solid #ddd',
    },
    spacer: {
      flex: '1 1 100%',
    },
    detailsBox: {
      padding: theme.spacing.unit * 3,
    },
    questionImg: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing.unit * 2,
    },
  });

const QuestionDetails = ({ classes, router }) => {
  const id = router.query.id;
  if (!id) return <Error statusCode={404} />;

  return (
    <QuestionDetailsConnector id={id}>
      {({ question }) => {
        // TODO: Mover essa lógica para o Connector
        if (!question) return <div>Essa questão não existe!</div>;
        return (
          <Paper elevation={4} className={classes.root}>
            <NextLink href={`/admin/questao-editar?id=${question.id}`}>
              <FAButton aria-label="Editar questão">
                <EditIcon />
              </FAButton>
            </NextLink>
            <Toolbar variant="dense" className={classes.toolbar}>
              <div className={classes.spacer} />
              <div className={classes.actions}>
                <Tooltip title="Excluir">
                  <SafeDeleteIconButton question={question} aria-label="Excluir questão" />
                </Tooltip>
              </div>
            </Toolbar>
            <div className={classes.detailsBox}>
              <Typography variant="subtitle1" gutterBottom paragraph>
                {question.wording}
              </Typography>
              {question.imageFullUrl && (
                <img
                  className={classes.questionImg}
                  src={question.imageFullUrl}
                  alt="Imagem da questão"
                />
              )}
              {question.secondaryWording && (
                <Typography variant="subtitle1" gutterBottom paragraph>
                  {question.secondaryWording}
                </Typography>
              )}
              {question.choices && question.choices.length > 0 && (
                <ChoicesBox choices={question.choices} />
              )}
            </div>
          </Paper>
        );
      }}
    </QuestionDetailsConnector>
  );
};

QuestionDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles),
)(QuestionDetails);
