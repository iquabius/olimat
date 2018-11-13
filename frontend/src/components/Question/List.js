import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ListItem from './ListItem';
import ListConnector from './ListConnector';
import FAButton from '../FAButton';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class QuestionList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Link href="/admin/questao-criar">
          <FAButton onClick={this.handleOpenCreateDialog} aria-label="Adicionar questão">
            <AddIcon />
          </FAButton>
        </Link>
        <ListConnector>
          {({ allQuestions }) => (
            <div className={classes.grid}>
              {allQuestions.map(question => (
                <ListItem key={question.id} question={question} />
              ))}
            </div>
          )}
        </ListConnector>
      </React.Fragment>
    );
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionList);
