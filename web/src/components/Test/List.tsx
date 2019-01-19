import {
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme,
  withStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../Link';

import ListConnector from './ListConnector';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...theme.shape,
      backgroundColor: theme.palette.background.paper,
    },
  });

const TestItemLink = props => {
  return <ListItem variant="button" button dense component={Link} {...props} />;
};

const TestList = ({ classes }) => {
  return (
    <ListConnector>
      {({ tests }) => (
        <List className={classes.root}>
          {tests.map(test => (
            <TestItemLink key={test.id} href={`/admin/provas/detalhes?id=${test.id}`}>
              <ListItemText primary={test.title} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Editar prova">
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </TestItemLink>
          ))}
        </List>
      )}
    </ListConnector>
  );
};

TestList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestList);
