import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from '@apollo/react-components';

import { questionsConnectionQuery } from './ListConnector';

export const newQuestionMutation = gql`
	mutation newQuestionMutation($input: QuestionCreateInput!) {
		createQuestion(input: $input) {
			question {
				id
				type
				wording
				imageUrl
				choices {
					id
					text
				}
			}
		}
	}
`;

const CreateConnector = ({ children }) => (
	<Mutation
		mutation={newQuestionMutation}
		refetchQueries={[{ query: questionsConnectionQuery }]}
	>
		{createQuestion => children({ createQuestion })}
	</Mutation>
);

CreateConnector.propTypes = {
	children: PropTypes.func.isRequired,
};

export default CreateConnector;
