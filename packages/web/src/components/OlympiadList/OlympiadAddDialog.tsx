import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import { gql, MutationFunction, useMutation } from '@apollo/client';
import React from 'react';

import { allOlympiadsQuery } from '.';

interface FormValues {
	createdBy: {
		email: string;
	};
	id: string;
	isPublished: boolean;
	name: string;
	year: string;
}

interface Props {
	onClose: () => void;
	open: boolean;
}

const OlympiadAddDialog: React.FC<Props> = props => {
	const { open, onClose } = props;
	const [newOlympiad] = useMutation(newOlympiadMutation);

	return (
		<Formik
			initialValues={initialFormState}
			onSubmit={handleSubmitOlympiad({ newOlympiad, onClose })}
		>
			{({ handleSubmit, handleChange, handleBlur, isSubmitting, values }) => (
				<Dialog
					open={open}
					onClose={onClose}
					aria-labelledby="school-add-dialog"
				>
					<DialogTitle id="school-add-dialog">Adicione uma escola</DialogTitle>
					<form onSubmit={handleSubmit}>
						<DialogContent>
							<TextField
								name="name"
								margin="dense"
								label="Nome"
								fullWidth
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<TextField
								name="year"
								margin="dense"
								label="Ano"
								type="number"
								inputProps={{
									min: '1999',
									max: '2018',
								}}
								fullWidth
								value={values.year}
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
	);
};

export const newOlympiadMutation = gql`
	mutation newOlympiadMutation($name: String!, $year: DateTime!) {
		createOlympiad(name: $name, year: $year) {
			id
			name
			isPublished
			year
			createdBy {
				email
			}
		}
	}
`;

export interface Olympiad extends FormValues {
	id: string;
}

interface Data {
	createOlympiad: Olympiad;
}

interface OlympiadFormProps {
	newOlympiad: MutationFunction<Data>;
	onClose: Props['onClose'];
}

const initialFormState = {
	id: '',
	createdBy: { email: '' },
	isPublished: false,
	name: '',
	year: '',
};

const handleSubmitOlympiad = ({ newOlympiad, onClose }: OlympiadFormProps) => (
	values: FormValues,
	{ setSubmitting },
) => {
	newOlympiad({
		variables: {
			name: values.name,
			year: new Date(values.year),
		},
		update: (proxy, { data: { createOlympiad } }) => {
			const data = proxy.readQuery<{ olympiads: Olympiad[] }>({
				query: allOlympiadsQuery,
			});
			const olympiads = [...data.olympiads, createOlympiad];

			proxy.writeQuery({ query: allOlympiadsQuery, data: { olympiads } });
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
};

export default OlympiadAddDialog;
