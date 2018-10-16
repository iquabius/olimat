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
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
    checked: [0],
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
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Toolbar>
          <Button onClick={() => {}} variant="contained" color="primary" className={classes.button}>
            Adicionar
          </Button>
        </Toolbar>
        <Query query={allCitiesQuery}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
              <List>
                {data.cities.map(({ id, name }) => (
                  <ListItem
                    key={id}
                    role={undefined}
                    dense
                    button
                    onClick={this.handleToggle(id)}
                    className={classes.listItem}
                  >
                    <Checkbox
                      checked={this.state.checked.indexOf(id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={name} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Comments">
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
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

export default withStyles(styles)(CityList);
