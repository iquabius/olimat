import { createStyles, Theme, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import FAButton from '../FAButton';
import LoadMoreButton from '../LoadMoreButton';

import ListConnector from './ListConnector';
import ListItem from './ListItem';

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });

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
          {({ questions, loadMoreHandler, loadingMore, hasMore }) => (
            <div>
              <div className={classes.grid}>
                {questions.map(question => (
                  <ListItem key={question.id} question={question} />
                ))}
              </div>
              <LoadMoreButton
                onLoadMore={loadMoreHandler}
                loadingMore={loadingMore}
                hasMore={hasMore}
              >
                Carregar mais questões
              </LoadMoreButton>
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
