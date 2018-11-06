import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import ListItem from './ListItem';
import ListConnector from './ListConnector';
import CreateDialog from './CreateDialog';
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
  FAButton: {
    position: 'absolute',
    top: -28,
    left: theme.spacing.unit * -6,
  },
  [theme.breakpoints.down(1000 + theme.spacing.unit * 8)]: {
    FAButton: {
      position: 'fixed',
      top: 'auto',
      left: 'auto',
      bottom: 20,
      right: 20,
    },
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
        <Button
          onClick={this.handleOpenCreateDialog}
          variant="fab"
          color="secondary"
          aria-label="Adicionar questão"
          className={classes.FAButton}
        >
          <AddIcon />
        </Button>
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
