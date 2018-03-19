import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

const SchoolAddDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="school-add-dialog">
    <DialogTitle id="school-add-dialog">Adicione uma escola</DialogTitle>
    <DialogContent>
      <TextField autoFocus margin="dense" label="Nome" fullWidth />
      <TextField margin="dense" label="Email" type="email" fullWidth />
      <TextField margin="dense" label="Telefone" fullWidth />
      <TextField margin="dense" label="Coordenador pedagógico" fullWidth />
      <TextField margin="dense" label="Diretor" fullWidth />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancelar
      </Button>
      <Button onClick={onClose} color="primary">
        Adicionar
      </Button>
    </DialogActions>
  </Dialog>
);

SchoolAddDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SchoolAddDialog;
