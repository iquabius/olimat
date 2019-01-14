import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { StyleRules } from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../Link';

import ListConnector from './ListConnector';

/**
 * This callback function is used to create the styles
 * @param {Theme} theme Material-UI theme
 * @return {StyleRules}
 */
const styles = theme => ({
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
