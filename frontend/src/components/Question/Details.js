import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import QuestionDetailsConnector from './DetailsConnector';
import { Typography, withStyles } from '@material-ui/core';
import ChoicesBox from './ChoicesBox';
import FAButton from '../FAButton';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  questionImg: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
});

const QuestionDetails = ({ classes, id }) => {
  if (!id) return <Error statusCode={404} />;

  return (
    <QuestionDetailsConnector id={id}>
      {({ question }) => {
        if (!question) return <div>Essa questão não existe!</div>;
        return (
          <div>
            <FAButton href={`/admin/questao-editar?id=${question.id}`} aria-label="Editar questão">
              <EditIcon />
            </FAButton>
            <Typography variant="body1" gutterBottom paragraph>
              {question.wording}
            </Typography>
            {question.imageUrl && (
              <img
                className={classes.questionImg}
                src={question.imageUrl}
                alt="Imagem da questão"
              />
            )}
            {question.secondaryWording && (
              <Typography component="" variant="body1" gutterBottom paragraph>
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
  id: PropTypes.string,
};

export default withStyles(styles)(QuestionDetails);
