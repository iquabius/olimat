import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { compose, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withState } from 'recompose';
import CityAddDialog from './CityAddDialog';
import CityEditListItem from './CityEditListItem';
import CityDeleteItemButton from './CityDeleteItemButton';

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
    checked: [],
    editing: null,
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { addDialogOpen, setAddDialogOpen, classes } = this.props;
    const { checked, editing } = this.state;
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
        <CityAddDialog open={addDialogOpen} onClose={handleCloseAddCity} />
        <Query query={allCitiesQuery}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <List>
                {data.cities.map(({ id, name }) => (
                  <ListItem key={id} role={undefined} dense button className={classes.listItem}>
                    <Checkbox
                      disabled={editing === id}
                      onChange={this.handleToggle(id)}
                      checked={checked.indexOf(id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    {editing === id ? (
                      <CityEditListItem handleCloseEdit={handleCloseEditCity} city={{ id, name }} />
                    ) : (
                      <React.Fragment>
                        <ListItemText primary={name} />
                        <ListItemSecondaryAction>
                          <CityDeleteItemButton city={{ id, name }} />
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
