import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { InjectedNotistackProps, withSnackbar } from 'notistack';
import React from 'react';
import { withState } from 'recompose';
import compose from 'recompose/compose';

import { allCitiesQuery } from './List';

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

const openDeleteWarningDialog = setDeleteWarningOpen => () =>
	setDeleteWarningOpen(true);

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

interface InnerProps extends InjectedNotistackProps {
	deleteWarningOpen: boolean;
	setDeleteWarningOpen: (open: boolean) => void;
}

interface OuterProps {
	city: {
		id: string;
		name: string;
	};
}

// TODO: While deleting the edit button should also be disabled
const CityDeleteItemButton: React.FunctionComponent<
	InnerProps & OuterProps
> = ({ city, deleteWarningOpen, enqueueSnackbar, setDeleteWarningOpen }) => {
	const [deleteCity] = useMutation(deleteCityMutation, { update: updateCache });

	return (
		<Formik
			initialValues={{ id: '' }}
			onSubmit={openDeleteWarningDialog(setDeleteWarningOpen)}
		>
			{({ handleSubmit, isSubmitting, setSubmitting }) => (
				// Maybe the wrapping element should de a <form/>
				// We set IconButton type to 'submit'
				<React.Fragment>
					<form onSubmit={handleSubmit} style={{ display: 'inline' }}>
						<IconButton
							disabled={isSubmitting}
							type="submit"
							aria-label="Excluir cidade"
						>
							<DeleteIcon />
						</IconButton>
					</form>
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
							>
								Excluir
							</Button>
						</DialogActions>
					</Dialog>
				</React.Fragment>
			)}
		</Formik>
	);
};

export default compose<InnerProps, OuterProps>(
	withSnackbar,
	withState('deleteWarningOpen', 'setDeleteWarningOpen', false),
)(CityDeleteItemButton);
