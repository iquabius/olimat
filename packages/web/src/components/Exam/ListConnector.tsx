import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';

import ErrorMessage from '../ErrorMessage';

export const allExams = gql`
	query allExams {
		exams {
			id
			title
		}
	}
`;

const ExamListConnector = ({ children }) => {
	const { data, error, loading } = useQuery(allExams);

	if (error)
		return <ErrorMessage message={`Error loading exams (${error.message})`} />;
	if (loading) return <div>Loading</div>;

	return children({ exams: data.exams });
};

ExamListConnector.propTypes = {
	children: PropTypes.func.isRequired,
};

export default ExamListConnector;
