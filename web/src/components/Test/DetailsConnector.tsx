import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

import ErrorMessage from '../ErrorMessage';
import { Question } from '../Question/DetailsConnector';

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

interface Test {
  id: string;
  questions: [Question];
  title: string;
}

interface TestDetailsConnectorProps {
  id: Test['id'];
  children: (connectorProps: { test: Test }) => JSX.Element;
}

const TestDetailsConnector: React.FunctionComponent<TestDetailsConnectorProps> = ({
  children,
  id,
}) => (
  <Query query={testQuery} variables={{ id }}>
    {({ data, error, loading }) => {
      if (error) return <ErrorMessage message={`Erro ao carregar questão (${error.message})`} />;
      if (loading) return <div>Loading...</div>;
      const test = data.test;

      return children({ test });
    }}
  </Query>
);

export default TestDetailsConnector;
