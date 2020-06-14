import { CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from '@apollo/react-components';

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

const QuestionTypeConnector = ({ children }) => (
	<Query query={questionTypeOptions}>
		{({ data, error, loading }) => {
			if (loading) {
				return <CircularProgress size={50} color="secondary" />;
			}
			return children({ questionTypes: data.__type.enumValues });
		}}
	</Query>
);

QuestionTypeConnector.propTypes = {
	children: PropTypes.func.isRequired,
};

export default QuestionTypeConnector;
