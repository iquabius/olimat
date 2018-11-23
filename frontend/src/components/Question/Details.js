import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import QuestionDetailsConnector from './DetailsConnector';
import { Typography, withStyles } from '@material-ui/core';
import ChoicesBox from './ChoicesBox';
import FAButton from '../FAButton';
import EditIcon from '@material-ui/icons/Edit';
import NextLink from 'next/link';
import compose from 'recompose/compose';
import { withRouter } from 'next/router';

const styles = theme => ({
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
        if (!question) return <div>Essa questão não existe!</div>;
        return (
          <div>
            <NextLink href={`/admin/questao-editar?id=${question.id}`}>
              <FAButton aria-label="Editar questão">
                <EditIcon />
              </FAButton>
            </NextLink>
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
            {question.choices &&
              question.choices.length > 0 && <ChoicesBox choices={question.choices} />}
          </div>
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
