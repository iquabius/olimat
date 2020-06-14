import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import React, { FocusEventHandler, FormEventHandler } from 'react';
import { graphql } from '@apollo/react-hoc';
import { compose } from 'recompose';
import { MutationFunction } from '@apollo/client';

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

interface InnerProps {
	handleBlur: FocusEventHandler;
	handleChange: FormEventHandler;
	handleSubmit: FormEventHandler;
	isSubmitting: boolean;
	values: FormValues;
}

interface OuterProps {
	onClose: () => void;
	open: boolean;
}

const OlympiadAddDialog: React.FunctionComponent<InnerProps & OuterProps> = ({
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
);

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
	onClose: OuterProps['onClose'];
}

export default compose<InnerProps, OuterProps>(
	graphql(newOlympiadMutation, {
		// Use an unambiguous name for use in the `props` section below
		name: 'newOlympiad',
	}),
	withFormik<OlympiadFormProps, FormValues>({
		mapPropsToValues: () => ({
			id: '',
			createdBy: { email: '' },
			isPublished: false,
			name: '',
			year: '',
		}),
		handleSubmit: (
			values,
			{ props: { newOlympiad, onClose }, setSubmitting },
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
					data.olympiads.push(createOlympiad);

					proxy.writeQuery({ query: allOlympiadsQuery, data });
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
)(OlympiadAddDialog);
