import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

export const questionQuery = gql`
  query questionQuery($id: ID!) {
    question(id: $id) {
      id
      type
      wording
      imageUrl
      secondaryWording
      choices {
        id
        text
      }
    }
  }
`;

export const updateQuestionMutation = gql`
  mutation updateQuestionMutation($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
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

// Maybe put this in responseToFormValues()
const filesHost = 'http://localhost:4000/files';

export const questionWithFullUrl = question => ({
  ...question,
  imageUrl: question.imageUrl,
  // This doesn't seam a very good solution
  imageFullUrl: question.imageUrl ? `${filesHost}/${question.imageUrl}` : null,
});

const QuestionDetailsConnector = ({ children, id }) => (
  <Query query={questionQuery} variables={{ id }}>
    {({ data, error, loading }) => (
      <Mutation mutation={updateQuestionMutation}>
        {updateQuestion => {
          if (loading) return <h1>Carregando questão...</h1>;
          // TODO: Handle error when the backend is down

          return children({
            isLoading: loading,
            question: questionWithFullUrl(data.question),
            updateQuestion,
          });
        }}
      </Mutation>
    )}
  </Query>
);

QuestionDetailsConnector.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default QuestionDetailsConnector;
