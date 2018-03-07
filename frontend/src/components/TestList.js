import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';

function TestList({ data: { loading, error, tests } }) {
  if (error) return <ErrorMessage message="Error loading tests." />;
  if (!loading) {
    return (
      <section>
        <ul>
          {tests.map((test, index) => (
            <li key={test.id}>
              <div>
                <span>{index + 1}. </span>
                {test.title}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return <div>Loading</div>;
}

export const allTests = gql`
  query allTests {
    tests {
      id
      title
      description
    }
  }
`;

export default graphql(allTests)(TestList);
