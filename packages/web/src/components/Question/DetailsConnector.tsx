import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from '@apollo/react-components';

import ErrorMessage from '../ErrorMessage';

export const questionQuery = gql`
	query questionQuery($id: ID!) {
		question(id: $id) {
			id
			type
			wording
			imageUrl
			imageFullUrl
			secondaryWording
			choices {
				id
				text
			}
		}
	}
`;

export const updateQuestionMutation = gql`
	mutation updateQuestionMutation($input: UpdateQuestionInput!) {
		updateQuestion(input: $input) {
			question {
				id
				type
				wording
				imageUrl
				imageFullUrl
				choices {
					id
					text
				}
			}
		}
	}
`;

export interface QuestionChoice {
	id: string;
	text: string;
}

export interface Question {
	id: string;
	wording: string;
	choices: QuestionChoice[];
	imageUrl?: string;
	imageFullUrl?: string;
}

const QuestionDetailsConnector = ({ children, id }) => {
	const { data, error, loading } = useQuery(questionQuery, {
		variables: { id },
	});

	return (
		<Mutation mutation={updateQuestionMutation}>
			{updateQuestion => {
				if (error) {
					return (
						<ErrorMessage
							message={`Erro ao carregar questão (${error.message})`}
						/>
					);
				}
				if (loading) return <h1>Carregando questão...</h1>;
				// TODO: Handle error when the backend is down

				return children({
					isLoading: loading,
					question: data.question,
					updateQuestion,
				});
			}}
		</Mutation>
	);
};

QuestionDetailsConnector.propTypes = {
	children: PropTypes.func.isRequired,
	id: PropTypes.string,
};

export default QuestionDetailsConnector;
