import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withState } from 'recompose';

import OlympiadAddDialog from './OlympiadAddDialog';

const styles = theme => ({
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

const OlympiadList = props => {
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
        <Button
          onClick={handleOpenAddOlympiad}
          variant="contained"
          color="primary"
          className={classes.button}
        >
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

OlympiadList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    olympiads: PropTypes.arrayOf(
      PropTypes.shape({
        createdBy: PropTypes.shape({ email: PropTypes.string.isRequired }),
        id: PropTypes.string.isRequired,
        isPublished: PropTypes.bool,
        name: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
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

export default compose(
  withState('addDialogOpen', 'setAddDialogOpen', false),
  graphql(allOlympiadsQuery),
  withStyles(styles),
)(OlympiadList);
