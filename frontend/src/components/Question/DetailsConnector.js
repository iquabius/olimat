import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const questionQuery = gql`
  query questionQuery($id: ID!) {
    question(id: $id) {
      id
      type
      wording
      imageUrl
      secondaryWording
      choices {
        text
      }
    }
  }
`;

const QuestionDetailsConnector = ({ children, id }) => (
  <Query query={questionQuery} variables={{ id }}>
    {({ data, error, loading }) =>
      children({
        isLoading: loading,
        question: data.question,
      })
    }
  </Query>
);

QuestionDetailsConnector.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default QuestionDetailsConnector;
