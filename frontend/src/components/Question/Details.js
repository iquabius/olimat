import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import QuestionDetailsConnector from './DetailsConnector';
import { Typography, withStyles } from '@material-ui/core';
import ChoicesBox from './ChoicesBox';

const styles = theme => ({
  questionImg: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
});

const QuestionDetails = ({ classes, id }) =>
  id ? (
    <QuestionDetailsConnector id={id}>
      {({ question }) =>
        question ? (
          <div>
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
        ) : (
          <div>Essa questão não existe!</div>
        )
      }
    </QuestionDetailsConnector>
  ) : (
    <Error statusCode={404} />
  );

QuestionDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
};

export default withStyles(styles)(QuestionDetails);
