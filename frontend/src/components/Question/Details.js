import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import QuestionDetailsConnector from './DetailsConnector';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  questionImg: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
  optionBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  optionItem: {
    ...theme.typography.body1,
    padding: theme.spacing.unit,
  },
  optionLabel: {
    fontWeight: 'bold',
  },
});

const optionLabels = ['a', 'b', 'c', 'd', 'e', 'f'];

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
            <div className={classes.optionBox}>
              {question.choices &&
                question.choices.length > 0 &&
                question.choices.map((choice, index) => (
                  <div key={choice.id} className={classes.optionItem}>
                    <span className={classes.optionLabel}>{`${optionLabels[index]}) `}</span>
                    {`${choice.text}`}
                  </div>
                ))}
            </div>
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
