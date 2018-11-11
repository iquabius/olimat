import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { allQuestionsQuery } from './ListConnector';

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
      const data = proxy.readQuery({ query: allQuestionsQuery });
      data.questions.push(createQuestion.question);

      proxy.writeQuery({ query: allQuestionsQuery, data });
    }}
  >
    {createQuestion => children({ createQuestion })}
  </Mutation>
);

CreateConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CreateConnector;
