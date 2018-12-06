import React from 'react';
import PropTypes from 'prop-types';
import ListConnector from './ListConnector';
import {
  List,
  withStyles,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
// eslint-disable-next-line no-unused-vars
import { Theme } from '@material-ui/core/styles/createMuiTheme';
// eslint-disable-next-line no-unused-vars
import { StyleRules } from '@material-ui/core/styles/withStyles';

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

function TestList({ classes }) {
  return (
    <ListConnector>
      {({ tests }) => (
        <List className={classes.root}>
          {tests.map(test => (
            <ListItem key={test.id} role={undefined} dense button onClick={() => {}}>
              <ListItemText primary={test.title} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Editar prova">
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </ListConnector>
  );
}

TestList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestList);
