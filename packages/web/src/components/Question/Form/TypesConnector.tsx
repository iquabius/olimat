import { CircularProgress } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';

// https://www.prisma.io/forum/t/23
export const questionTypeOptions = gql`
	query questionTypeOptions {
		__type(name: "QUESTION_TYPE") {
			name
			enumValues {
				description
				name
			}
		}
	}
`;

// {
//   "data": {
//     "__type": {
//       "name": "QUESTION_TYPE",
//       "enumValues": [
//         {
//           "description": "Múltipla escolha",
//           "name": "MULTIPLE_CHOICE"
//         },
//         {
//           "description": "Discursiva",
//           "name": "OPEN_ENDED"
//         }
//       ]
//     }
//   }
// }

const QuestionTypeConnector = ({ children }) => {
	const { data, loading } = useQuery(questionTypeOptions);

	if (loading) {
		return <CircularProgress size={50} color="secondary" />;
	}
	return children({ questionTypes: data.__type.enumValues });
};

QuestionTypeConnector.propTypes = {
	children: PropTypes.func.isRequired,
};

export default QuestionTypeConnector;
