import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import EditIcon from '@material-ui/icons/Edit';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, Query } from 'react-apollo';
import { withState } from 'recompose';

import AddDialog from './AddDialog';
import DeleteItemButton from './DeleteItemButton';
import EditListItem from './EditListItem';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 32,
  },
});

export const allCitiesQuery = gql`
  query allCitiesQuery {
    cities {
      id
      name
    }
  }
`;

class CityList extends React.Component {
  state = {
    editing: null,
  };

  render() {
    const { addDialogOpen, setAddDialogOpen, classes } = this.props;
    const { editing } = this.state;
    const handleOpenAddCity = () => setAddDialogOpen(true);
    const handleCloseAddCity = () => setAddDialogOpen(false);
    const handleEditCity = id => () => this.setState({ editing: id });
    const handleCloseEditCity = () => this.setState({ editing: null });

    return (
      <Paper className={classes.root}>
        <Toolbar>
          <Button
            onClick={handleOpenAddCity}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Adicionar
          </Button>
        </Toolbar>
        <AddDialog open={addDialogOpen} onClose={handleCloseAddCity} />
        <Query query={allCitiesQuery}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <List>
                {data.cities.map(({ id, name }) => (
                  <ListItem key={id} role={undefined}>
                    {editing === id ? (
                      <EditListItem handleCloseEdit={handleCloseEditCity} city={{ id, name }} />
                    ) : (
                      <React.Fragment>
                        <ListItemText primary={name} />
                        <ListItemSecondaryAction>
                          <DeleteItemButton city={{ id, name }} />
                          <IconButton onClick={handleEditCity(id)} aria-label="Editar cidade">
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </React.Fragment>
                    )}
                  </ListItem>
                ))}
              </List>
            );
          }}
        </Query>
      </Paper>
    );
  }
}

CityList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withState('addDialogOpen', 'setAddDialogOpen', false),
  withStyles(styles),
)(CityList);
