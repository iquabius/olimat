import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withFormik } from 'formik';
import { allOlympiadsQuery } from './OlympiadList';

const OlympiadAddDialog = ({
  open,
  onClose,
  handleSubmit,
  handleChange,
  handleBlur,
  isSubmitting,
  values,
}) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="school-add-dialog">
    <DialogTitle id="school-add-dialog">Adicione uma escola</DialogTitle>
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <TextField
          name="name"
          autoFocus
          margin="dense"
          label="Nome"
          fullWidth
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          name="year"
          margin="dense"
          label="Ano"
          type="number"
          min="1999"
          max="2018"
          fullWidth
          value={values.year}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit" color="primary">
          Adicionar
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

OlympiadAddDialog.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    createdBy: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
};

export const newOlympiadMutation = gql`
  mutation newOlympiadMutation($name: String!, $year: DateTime!) {
    createOlympiad(name: $name, year: $year) {
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
  graphql(newOlympiadMutation, {
    // Use an unambiguous name for use in the `props` section below
    name: 'newOlympiad',
  }),
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      year: '',
    }),
    handleSubmit: (values, { props: { newOlympiad, onClose }, setSubmitting }) => {
      newOlympiad({
        variables: {
          name: values.name,
          year: new Date(values.year),
        },
        update: (proxy, { data: { createOlympiad } }) => {
          const data = proxy.readQuery({ query: allOlympiadsQuery });
          data.olympiads.push(createOlympiad);

          proxy.writeQuery({ query: allOlympiadsQuery, data });
        },
      })
        .then(response => {
          console.log(`Mutation response: `);
          console.log(response);
          setSubmitting(false);
          onClose();
        })
        .catch(error => {
          // Something went wrong, such as incorrect password, or no network
          // available, etc.
          console.error(error);
        });
    },
  }),
)(OlympiadAddDialog);
