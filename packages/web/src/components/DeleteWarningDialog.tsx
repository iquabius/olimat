import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const DeleteWarningDialog = ({
	content,
	isSubmitting,
	open,
	onCancel,
	onSuccess,
	title,
}) => (
	<Dialog
		open={open}
		onClose={onCancel}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				{content}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button
				aria-label="Cancelar excluir questão"
				disabled={isSubmitting}
				onClick={onCancel}
				color="secondary"
			>
				Cancelar
			</Button>
			<Button
				aria-label="Confirmar excluir questão"
				disabled={isSubmitting}
				onClick={onSuccess}
				color="secondary"
			>
				Excluir
			</Button>
		</DialogActions>
	</Dialog>
);

DeleteWarningDialog.propTypes = {
	content: PropTypes.string.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
	open: PropTypes.bool,
	title: PropTypes.string.isRequired,
};

export default DeleteWarningDialog;
