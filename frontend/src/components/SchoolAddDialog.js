import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withFormik } from 'formik';

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
          name="pedagogicalCoordinator"
          margin="dense"
          label="Coordenador pedagógico"
          fullWidth
          value={values.pedagogicalCoordinator}
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
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    pedagogicalCoordinator: PropTypes.string,
    director: PropTypes.string,
    city: PropTypes.string.isRequired,
    address: PropTypes.string,
  }).isRequired,
};

export const newSchoolMutation = gql`
  mutation newSchoolMutation(
    $name: String!
    $email: String!
    $phone: String
    $pedagogicalCoordinator: String
    $director: String
    $city: String!
    $address: String
  ) {
    createSchool(
      name: $name
      email: $email
      phone: $phone
      pedagogicalCoordinator: $pedagogicalCoordinator
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
      pedagogicalCoordinator: '',
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
          pedagogicalCoordinator: values.pedagogicalCoordinator,
          director: values.director,
          city: 'Barra do Bugres',
          address: values.address,
        },
      })
        .then(response => {
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
