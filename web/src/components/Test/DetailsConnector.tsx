import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import ErrorMessage from '../ErrorMessage';

export const testQuery = gql`
  query testQuery($id: ID!) {
    test(id: $id) {
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

const TestDetailsConnector = ({ children, id }) => (
  <Query query={testQuery} variables={{ id }}>
    {({ data, error, loading }) => {
      if (error) return <ErrorMessage message={`Erro ao carregar questão (${error.message})`} />;
      if (loading) return <div>Loading...</div>;
      const test = data.test;

      return children({ test });
    }}
  </Query>
);

TestDetailsConnector.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TestDetailsConnector;
