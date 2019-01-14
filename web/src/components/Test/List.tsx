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
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { StyleRules } from '@material-ui/core/styles/withStyles';
import Link from '../Link';

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

function TestItemLink(props) {
  return <ListItem variant="button" button dense component={Link} {...props} />;
}

function TestList({ classes }) {
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
}

TestList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestList);
