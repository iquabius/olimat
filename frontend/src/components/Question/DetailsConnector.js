import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { allQuestionsQuery } from './ListConnector';

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

const QuestionDetailsConnector = ({ children, id }) => (
  <Query query={questionQuery} variables={{ id }}>
    {({ data, error, loading }) => (
      <Mutation
        mutation={updateQuestionMutation}
        update={(proxy, { data: { updateQuestion } }) => {
          try {
            const cacheData = proxy.readQuery({ query: allQuestionsQuery });
            cacheData.questions.push(updateQuestion.question);

            proxy.writeQuery({ query: allQuestionsQuery, cacheData });
          } catch (cacheError) {
            // Do nothing. Questions were not fetched yet.
          }
        }}
      >
        {updateQuestion => {
          if (loading) return <h1>Carregando questão...</h1>;
          return children({
            isLoading: loading,
            question: data.question,
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
