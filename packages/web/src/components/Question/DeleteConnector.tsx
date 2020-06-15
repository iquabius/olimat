import { gql, MutationFunction, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';

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
	const [deleteQuestion] = useMutation(deleteQuestionMutation, {
		refetchQueries: [{ query: questionsConnectionQuery }],
	});

	return children(deleteQuestion);
};

DeleteConnector.propTypes = {
	children: PropTypes.func.isRequired,
};

export default DeleteConnector;
