import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

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

function OlympiadList(props) {
  const { classes, data: { loading, olympiads } } = props;

  if (loading) {
    return <div className={classes.root}>Loading</div>;
  }

  return (
    <div className={classes.root}>
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
    </div>
  );
}

OlympiadList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    olympiads: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isPublished: PropTypes.bool,
        year: PropTypes.string.isRequired,
        createdBy: PropTypes.shape({ email: PropTypes.string.isRequired }),
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

export default compose(graphql(allOlympiadsQuery), withStyles(styles))(OlympiadList);
