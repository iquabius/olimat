import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from '../ErrorMessage';

export const allTests = gql`
  query allTests {
    tests {
      id
      title
    }
  }
`;

const TestListConnector = ({ children }) => (
  <Query query={allTests}>
    {({ data, error, loading }) => {
      if (error) return <ErrorMessage message={`Error loading tests (${error.message})`} />;
      if (loading) return <div>Loading</div>;

      return children({ tests: data.tests });
    }}
  </Query>
);

TestListConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TestListConnector;
