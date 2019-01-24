import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import ErrorMessage from '../ErrorMessage';

export const allExams = gql`
  query allExams {
    exams {
      id
      title
    }
  }
`;

const ExamListConnector = ({ children }) => (
  <Query query={allExams}>
    {({ data, error, loading }) => {
      if (error) return <ErrorMessage message={`Error loading exams (${error.message})`} />;
      if (loading) return <div>Loading</div>;

      return children({ exams: data.exams });
    }}
  </Query>
);

ExamListConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ExamListConnector;
