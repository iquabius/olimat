import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ListItem from './ListItem';
import ListConnector from './ListConnector';

const styles = theme => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    marginBottom: 32,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class QuestionList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <ListConnector>
        {({ allQuestions }) => (
          <div className={classes.root}>
            <div className={classes.grid}>
              {allQuestions.map(question => (
                <ListItem key={question.id} question={question} />
              ))}
            </div>
          </div>
        )}
      </ListConnector>
    );
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionList);
