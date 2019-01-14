import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';

const CancelDialog = ({ onCancel, onContinue, open = false }) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby="cancel-dialog-title"
    aria-describedby="cancel-dialog-description"
    data-testid="cancel-dialog"
  >
    <DialogTitle id="cancel-dialog-title">Descartar rascunho da questão?</DialogTitle>
    <DialogContent>
      <DialogContentText id="cancel-dialog-description">
        A questão não foi salva. Se você sair ela não poderá ser recuperada.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} autoFocus>
        Cancelar
      </Button>
      <Button onClick={onContinue} color="secondary" variant="contained">
        Descartar
      </Button>
    </DialogActions>
  </Dialog>
);

CancelDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default CancelDialog;
