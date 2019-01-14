import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

import { allCitiesQuery } from './List';

export const newCityMutation = gql`
  mutation newCityMutation($name: String!) {
    createCity(name: $name) {
      id
      name
    }
  }
`;

const onSubmitCity = (newCity, onClose) => (values, { resetForm }) => {
  newCity({
    variables: {
      name: values.name,
    },
  })
    .then(response => {
      console.log(`Mutation response: `);
      console.log(response);
      resetForm();
      onClose();
    })
    .catch(error => {
      // Something went wrong, such as incorrect password, or no network
      // available, etc.
      console.error(error);
    });
};

const updateCache = (proxy, { data: { createCity } }) => {
  const data = proxy.readQuery({ query: allCitiesQuery });
  data.cities.push(createCity);
  proxy.writeQuery({ query: allCitiesQuery, data });
};

const AddDialog = ({ open, onClose }) => (
  <Mutation mutation={newCityMutation} update={updateCache}>
    {(newCity, { data }) => (
      <Formik initialValues={{ name: '' }} onSubmit={onSubmitCity(newCity, onClose)}>
        {({ handleSubmit, handleChange, handleBlur, isSubmitting, values }) => (
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
        )}
      </Formik>
    )}
  </Mutation>
);

AddDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddDialog;
