import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SchoolAddDialog = ({ open, onClose, handleAddSchool }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="school-add-dialog">
    <DialogTitle id="school-add-dialog">Adicione uma escola</DialogTitle>
    <form onSubmit={handleAddSchool}>
      <DialogContent>
        <TextField name="name" autoFocus margin="dense" label="Nome" fullWidth />
        <TextField name="email" margin="dense" label="Email" type="email" fullWidth />
        <TextField name="phone" margin="dense" label="Telefone" fullWidth />
        <TextField
          name="pedagogicalCoordinator"
          margin="dense"
          label="Coordenador pedagógico"
          fullWidth
        />
        <TextField name="director" margin="dense" label="Diretor" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          Adicionar
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

SchoolAddDialog.propTypes = {
  handleAddSchool: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
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

export default graphql(newSchoolMutation, {
  // Use an unambiguous name for use in the `props` section below
  name: 'newSchool',
  // Apollo's way of injecting new props which are passed to the component
  props: ({ newSchool, ownProps: { onClose } }) => ({
    // `handleAddSchool` is the name of the prop passed to the component
    handleAddSchool: event => {
      /* global FormData */
      const data = new FormData(event.target);
      console.log(data);

      event.preventDefault();
      event.stopPropagation();

      newSchool({
        variables: {
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          pedagogicalCoordinator: data.get('pedagogicalCoordinator'),
          director: data.get('director'),
          city: 'Barra do Bugres',
          address: data.get('address'),
        },
      })
        .then(({ data: { createSchool: { id, name, email, phone, city } } }) => {
          // This is React's SyntheticEvent wrapper, we can't use 'event.target'
          // event.target.reset();
          onClose();
        })
        .catch(error => {
          // Something went wrong, such as incorrect password, or no network
          // available, etc.
          console.error(error);
        });
    },
  }),
})(SchoolAddDialog);
