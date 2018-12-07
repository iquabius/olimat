import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from '../ErrorMessage';
import { questionWithFullUrl } from '../Question/DetailsConnector';

const testQuery = gql`
  query testQuery($id: ID!) {
    test(id: $id) {
      title
      questions {
        id
        wording
        imageUrl
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

      return children({
        test: {
          ...test,
          // TODO: Mover essa lógica para o backend, usando 'computed fields'
          questions: test.questions.map(questionWithFullUrl),
        },
      });
    }}
  </Query>
);

TestDetailsConnector.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TestDetailsConnector;
