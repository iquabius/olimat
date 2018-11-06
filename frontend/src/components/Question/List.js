import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ListItem from './ListItem';
import ListConnector from './ListConnector';
import CreateDialog from './CreateDialog';
import FAButton from '../FAButton';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    marginBottom: 32,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class QuestionList extends React.Component {
  state = {
    createDialogOpen: false,
  };

  handleOpenCreateDialog = () => this.setState({ createDialogOpen: true });

  handleCloseCreateDialog = () => this.setState({ createDialogOpen: false });

  render() {
    const { classes } = this.props;
    const { createDialogOpen } = this.state;

    return (
      <React.Fragment>
        <FAButton onClick={this.handleOpenCreateDialog} aria-label="Adicionar questão">
          <AddIcon />
        </FAButton>
        <CreateDialog open={createDialogOpen} onClose={this.handleCloseCreateDialog} />
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
      </React.Fragment>
    );
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionList);
