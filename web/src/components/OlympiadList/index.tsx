import {
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Theme,
  WithStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import gql from 'graphql-tag';
import React from 'react';
import { DataProps, graphql } from 'react-apollo';
import { compose, withState } from 'recompose';

import OlympiadAddDialog, { Olympiad } from './OlympiadAddDialog';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 6,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    column: {
      flexBasis: '50%',
    },
  });

interface Response {
  olympiads: Olympiad[];
}

interface InnerProps extends DataProps<Response>, WithStyles<typeof styles> {
  addDialogOpen: boolean;
  setAddDialogOpen: (open: boolean) => void;
}

const OlympiadList: React.FunctionComponent<InnerProps> = props => {
  const {
    addDialogOpen,
    setAddDialogOpen,
    classes,
    data: { loading, olympiads },
  } = props;
  const handleOpenAddOlympiad = () => setAddDialogOpen(true);
  const handleCloseAddOlympiad = () => setAddDialogOpen(false);

  if (loading) {
    return <div className={classes.root}>Loading</div>;
  }

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Button onClick={handleOpenAddOlympiad} variant="contained" color="primary">
          Adicionar
        </Button>
      </Toolbar>
      <OlympiadAddDialog open={addDialogOpen} onClose={handleCloseAddOlympiad} />
      {olympiads.map(olympiad => (
        <ExpansionPanel key={olympiad.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{olympiad.name}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                {new Date(olympiad.year).getFullYear()}
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Olimpíada criada por <em>{olympiad.createdBy.email}</em>.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Paper>
  );
};

export const allOlympiadsQuery = gql`
  query allOlympiadsQuery {
    olympiads {
      id
      name
      isPublished
      year
      createdBy {
        email
      }
    }
  }
`;

export default compose<InnerProps, {}>(
  withState('addDialogOpen', 'setAddDialogOpen', false),
  graphql(allOlympiadsQuery),
  withStyles(styles),
)(OlympiadList);
