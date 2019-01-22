import {
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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

interface Props extends WithStyles<typeof styles> {}

const TestList: React.FunctionComponent<Props> = ({ classes }) => {
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

export default withStyles(styles)(TestList);
