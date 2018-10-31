import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Toolbar, Button } from '@material-ui/core';
import ListItem from './ListItem';
import ListConnector from './ListConnector';
import CreateDialog from './CreateDialog';

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
  state = {
    createDialogOpen: false,
  };

  handleOpenCreateDialog = () => this.setState({ createDialogOpen: true });

  handleCloseCreateDialog = () => this.setState({ createDialogOpen: false });

  render() {
    const { classes } = this.props;
    const { createDialogOpen } = this.state;

    return (
      <ListConnector>
        {({ allQuestions }) => (
          <div className={classes.root}>
            <Toolbar>
              <Button
                onClick={this.handleOpenCreateDialog}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Adicionar
              </Button>
              <CreateDialog open={createDialogOpen} onClose={this.handleCloseCreateDialog} />
            </Toolbar>
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
