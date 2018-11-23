import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ListItem from './ListItem';
import ListConnector from './ListConnector';
import FAButton from '../FAButton';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import LoadMoreButton from '../LoadMoreButton';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class QuestionList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Link href="/admin/questao-criar">
          <FAButton aria-label="Adicionar questão">
            <AddIcon />
          </FAButton>
        </Link>
        <ListConnector>
          {({ questions, handleLoadMore }) => (
            <div>
              <div className={classes.grid}>
                {questions.map(question => (
                  <ListItem key={question.id} question={question} />
                ))}
              </div>
              <LoadMoreButton onLoadMore={handleLoadMore}>Carregar mais questões</LoadMoreButton>
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
