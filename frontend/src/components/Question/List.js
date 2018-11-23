import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import ListItem from './ListItem';
import ListConnector from './ListConnector';
import FAButton from '../FAButton';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loadMoreButton: {
    borderStyle: 'dashed',
    marginTop: theme.spacing.unit * 2,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'table',
  },
  [theme.breakpoints.up('sm')]: {
    loadMoreButton: {
      width: '49%',
    },
  },
  [theme.breakpoints.up('md')]: {
    loadMoreButton: {
      maxWidth: '32%',
    },
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
          {({ allQuestions, handleLoadMore }) => (
            <div>
              <div className={classes.grid}>
                {allQuestions.map(question => (
                  <ListItem key={question.id} question={question} />
                ))}
              </div>
              <Button
                onClick={handleLoadMore}
                color="primary"
                size="large"
                variant="outlined"
                className={classes.loadMoreButton}
              >
                Carregar mais questões
              </Button>
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
