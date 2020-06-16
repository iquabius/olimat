import { gql, useQuery } from '@apollo/client';
import React from 'react';

import ErrorMessage from '../ErrorMessage';
import { Question } from '../Question/DetailsConnector';

export const examQuery = gql`
	query examQuery($id: ID!) {
		exam(id: $id) {
			id
			title
			questions {
				id
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
	}
`;

interface Exam {
	id: string;
	questions: [Question];
	title: string;
}

interface ExamDetailsConnectorProps {
	id: Exam['id'];
	children: (connectorProps: { exam: Exam }) => JSX.Element;
}

const ExamDetailsConnector: React.FunctionComponent<
	ExamDetailsConnectorProps
> = ({ children, id }) => {
	const { data, error, loading } = useQuery(examQuery, { variables: { id } });

	if (error)
		return (
			<ErrorMessage message={`Erro ao carregar questão (${error.message})`} />
		);
	if (loading) return <div>Loading...</div>;
	const exam = data.exam;

	return children({ exam });
};

export default ExamDetailsConnector;
