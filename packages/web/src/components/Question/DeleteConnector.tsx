import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from '@apollo/react-components';
import { MutationFunction } from '@apollo/client';

import { questionsConnectionQuery } from './ListConnector';

export const deleteQuestionMutation = gql`
	mutation deleteQuestionMutation($id: ID!) {
		deleteQuestion(id: $id) {
			question {
				id
				wording
			}
		}
	}
`;

interface DeleteConnectorProps {
	children(deleteQuestion: MutationFunction): JSX.Element;
}

const DeleteConnector: React.FunctionComponent<DeleteConnectorProps> = ({
	children,
}) => {
	return (
		<Mutation
			mutation={deleteQuestionMutation}
			refetchQueries={[{ query: questionsConnectionQuery }]}
		>
			{deleteQuestion => children(deleteQuestion)}
		</Mutation>
	);
};

DeleteConnector.propTypes = {
	children: PropTypes.func.isRequired,
};

export default DeleteConnector;
