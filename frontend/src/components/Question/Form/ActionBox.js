import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
  actionBox: {
    display: 'flex',
    flex: '0 0 auto',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit,
  },
  saveButton: {
    width: '33%',
  },
  cancelButton: {
    width: '25%',
    marginRight: theme.spacing.unit,
  },
  [theme.breakpoints.down('xs')]: {
    saveButton: {
      width: '100%',
    },
    cancelButton: {
      marginRight: 0,
      marginTop: theme.spacing.unit,
      width: '100%',
      order: 1,
    },
  },
});

const QuestionFormActionBox = ({ classes, formikProps }) => (
  <div className={classes.actionBox}>
    <Button
      disabled={formikProps.isSubmitting}
      onClick={() => {
        // We should check if form is dirty before leaving page.
        // And show a dialog for confirmation.
        Router.push(`/admin/questao?id=${formikProps.values.id}`);
      }}
      className={classes.cancelButton}
      size="large"
      variant="outlined"
    >
      Cancelar
    </Button>
    <Button
      disabled={formikProps.isSubmitting}
      type="submit"
      className={classes.saveButton}
      color="secondary"
      size="large"
      variant="contained"
    >
      Salvar
    </Button>
  </div>
);

QuestionFormActionBox.propTypes = {
  classes: PropTypes.object.isRequired,
  formikProps: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionFormActionBox);
