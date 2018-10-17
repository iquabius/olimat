import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withFormik } from 'formik';
import { allCitiesQuery } from './CityList';

const CityAddDialog = ({
  open,
  onClose,
  handleSubmit,
  handleChange,
  handleBlur,
  isSubmitting,
  values,
}) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="city-add-dialog">
    <DialogTitle id="city-add-dialog">Adicione uma cidade</DialogTitle>
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

CityAddDialog.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export const newCityMutation = gql`
  mutation newCityMutation($name: String!) {
    createCity(name: $name) {
      id
      name
    }
  }
`;

export default compose(
  graphql(newCityMutation, {
    // Use an unambiguous name for use in the `props` section below
    name: 'newCity',
  }),
  withFormik({
    mapPropsToValues: () => ({
      name: '',
    }),
    handleSubmit: (values, { props: { newCity, onClose }, setSubmitting }) => {
      newCity({
        variables: {
          name: values.name,
        },
        update: (proxy, { data: { createCity } }) => {
          const data = proxy.readQuery({ query: allCitiesQuery });
          data.cities.push(createCity);

          proxy.writeQuery({ query: allCitiesQuery, data });
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
)(CityAddDialog);
