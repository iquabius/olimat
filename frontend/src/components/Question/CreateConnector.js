import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { questionsConnection } from './ListConnector';

export const newQuestionMutation = gql`
  mutation newQuestionMutation($input: QuestionCreateInput!) {
    createQuestion(input: $input) {
      question {
        id
        type
        wording
        imageUrl
        choices {
          id
          text
        }
      }
    }
  }
`;

const CreateConnector = ({ children }) => (
  <Mutation
    mutation={newQuestionMutation}
    update={(proxy, { data: { createQuestion } }) => {
      try {
        const data = proxy.readQuery({ query: questionsConnection });
        const questionEdge = {
          cursor: createQuestion.question.id,
          node: createQuestion.question,
        };
        data.questionsConnection.unshift(questionEdge);

        proxy.writeQuery({ query: questionsConnection, data });
      } catch (error) {
        // Do nothing. Questions were not fetched yet.
      }
    }}
  >
    {createQuestion => children({ createQuestion })}
  </Mutation>
);

CreateConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CreateConnector;
