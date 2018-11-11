import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const allQuestionsQuery = gql`
  query allQuestionsQuery {
    questions {
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
`;

const ListConnector = ({ children }) => (
  <Query query={allQuestionsQuery}>
    {({ data, error, loading }) => {
      if (loading) return <p>Carregando questões...</p>;
      if (error) return <p>{`Erro ao carregar questões: ${error}`}</p>;
      return children({ allQuestions: data.questions });
    }}
  </Query>
);

ListConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ListConnector;
