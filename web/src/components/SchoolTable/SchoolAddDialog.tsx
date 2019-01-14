import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, graphql } from 'react-apollo';

import { allSchoolsQuery } from '.';

const SchoolAddDialog = ({
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
          name="email"
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          name="phone"
          margin="dense"
          label="Telefone"
          fullWidth
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          name="pedagogyCoord"
          margin="dense"
          label="Coordenador pedagógico"
          fullWidth
          value={values.pedagogyCoord}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          name="director"
          margin="dense"
          label="Diretor"
          fullWidth
          value={values.director}
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

SchoolAddDialog.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string.isRequired,
    director: PropTypes.string,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pedagogyCoord: PropTypes.string,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export const newSchoolMutation = gql`
  mutation newSchoolMutation(
    $name: String!
    $email: String!
    $phone: String
    $pedagogyCoord: String
    $director: String
    $city: String!
    $address: String
  ) {
    createSchool(
      name: $name
      email: $email
      phone: $phone
      pedagogyCoord: $pedagogyCoord
      director: $director
      city: $city
      address: $address
    ) {
      id
      name
      email
      phone
      city {
        name
      }
    }
  }
`;

export default compose(
  graphql(newSchoolMutation, {
    // Use an unambiguous name for use in the `props` section below
    name: 'newSchool',
  }),
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      email: '',
      phone: '',
      pedagogyCoord: '',
      director: '',
      city: '',
      address: '',
    }),
    handleSubmit: (values, { props: { newSchool, onClose }, setSubmitting }) => {
      newSchool({
        variables: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          pedagogyCoord: values.pedagogyCoord,
          director: values.director,
          city: 'Barra do Bugres',
          address: values.address,
        },
        update: (proxy, { data: { createSchool } }) => {
          const data = proxy.readQuery({ query: allSchoolsQuery });
          data.schools.push(createSchool);

          proxy.writeQuery({ query: allSchoolsQuery, data });
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
)(SchoolAddDialog);
