import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import gql from 'graphql-tag';
import { allCitiesQuery } from './List';
import { Formik } from 'formik';
import { withState } from 'recompose';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import compose from 'recompose/compose';

export const deleteCityMutation = gql`
  mutation deleteCityMutation($id: ID!) {
    deleteCity(id: $id) {
      id
      name
    }
  }
`;

const onCancelDelete = (setDeleteWarningOpen, setSubmitting) => () => {
  setSubmitting(false);
  setDeleteWarningOpen(false);
};

const openDeleteWarningDialog = setDeleteWarningOpen => () => setDeleteWarningOpen(true);

const onSubmitDelete = (deleteCity, city, enqueueSnackbar) => () => {
  deleteCity({
    variables: {
      id: city.id,
    },
  })
    .then(response => {
      console.log(`Delete City Mutation response: `);
      console.log(response);
      enqueueSnackbar('Cidade excluída', { variant: 'success' });
    })
    .catch(error => {
      // Something went wrong, such as incorrect password, or no network available, etc.
      const errorMessage = `Erro ao excluir cidade: "${error.message}"`;
      enqueueSnackbar(errorMessage, { variant: 'error' });
    });
};

const updateCache = (cache, { data: { deleteCity } }) => {
  const { cities } = cache.readQuery({ query: allCitiesQuery });
  cache.writeQuery({
    query: allCitiesQuery,
    data: { cities: cities.filter(c => c.id !== deleteCity.id) },
  });
};

// TODO: While deleting the edit button should also be disabled
const CityDeleteItemButton = ({
  city,
  deleteWarningOpen,
  enqueueSnackbar,
  setDeleteWarningOpen,
}) => (
  <Mutation mutation={deleteCityMutation} update={updateCache}>
    {deleteCity => (
      <Formik onSubmit={openDeleteWarningDialog(setDeleteWarningOpen)}>
        {({ handleSubmit, isSubmitting, setSubmitting }) => (
          <React.Fragment>
            <IconButton disabled={isSubmitting} onClick={handleSubmit} aria-label="Excluir cidade">
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={deleteWarningOpen}
              onClose={onCancelDelete(setDeleteWarningOpen, setSubmitting)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{`Excluir ${city.name}?`}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`A cidade de ${city.name} será apagada permanentemente.`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={onCancelDelete(setDeleteWarningOpen, setSubmitting)}
                  color="secondary"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={onSubmitDelete(deleteCity, city, enqueueSnackbar)}
                  color="secondary"
                  autoFocus
                >
                  Excluir
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </Formik>
    )}
  </Mutation>
);

CityDeleteItemButton.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default compose(
  withSnackbar,
  withState('deleteWarningOpen', 'setDeleteWarningOpen', false),
)(CityDeleteItemButton);
