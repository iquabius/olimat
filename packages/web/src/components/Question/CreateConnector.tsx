import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

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

const CreateConnector = ({ children }) => {
	const [createQuestion, {}] = useMutation(newQuestionMutation, {
		refetchQueries: [{ query: questionsConnectionQuery }],
	});

	return children({ createQuestion });
};

CreateConnector.propTypes = {
	children: PropTypes.func.isRequired,
};

export default CreateConnector;
