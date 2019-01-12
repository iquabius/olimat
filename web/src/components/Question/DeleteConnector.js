import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { questionsConnectionQuery } from './ListConnector';

export const deleteQuestionMutation = gql`
  mutation deleteQuestionMutation($id: ID!) {
    deleteQuestion(id: $id) {
      question {
        id
        wording
      }
    }
  }
`;

function DeleteConnector({ children }) {
  return (
    <Mutation
      mutation={deleteQuestionMutation}
      refetchQueries={[{ query: questionsConnectionQuery }]}
    >
      {deleteQuestion => children(deleteQuestion)}
    </Mutation>
  );
}

DeleteConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DeleteConnector;
