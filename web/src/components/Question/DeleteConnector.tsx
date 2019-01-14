import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

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

const DeleteConnector = ({ children }) => {
  return (
    <Mutation
      mutation={deleteQuestionMutation}
      refetchQueries={[{ query: questionsConnectionQuery }]}
    >
      {deleteQuestion => children(deleteQuestion)}
    </Mutation>
  );
};

DeleteConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DeleteConnector;
