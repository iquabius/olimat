import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, compose } from 'react-apollo';
import { questionWithFullUrl } from './DetailsConnector';

export const questionsConnection = gql`
  query questionsConnection($cursor: String) {
    questionsConnection(first: 6, after: $cursor, orderBy: createdAt_DESC) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          type
          wording
          imageUrl
          choices {
            id
            text
          }
        }
        cursor
      }
    }
  }
`;

const updateQuery = (previousResult, { fetchMoreResult }) => {
  const newEdges = fetchMoreResult.questionsConnection.edges;
  const pageInfo = fetchMoreResult.questionsConnection.pageInfo;

  return newEdges.length
    ? {
        // Put the new questions at the end of the list and update `pageInfo`
        // so we have the new `endCursor` and `hasNextPage` values
        questionsConnection: {
          // eslint-disable-next-line no-underscore-dangle
          __typename: previousResult.questionsConnection.__typename,
          edges: [...previousResult.questionsConnection.edges, ...newEdges],
          pageInfo,
        },
      }
    : previousResult;
};

const questionEdgeToNode = questionEdge => questionEdge.node;

const ListConnector = ({ children }) => (
  <Query query={questionsConnection}>
    {({ data, error, fetchMore, loading }) => {
      if (loading) return <p>Carregando questões...</p>;
      if (error) return <p>{`Erro ao carregar questões: ${error}`}</p>;
      return children({
        // Move this logic to responseToFormValues() maybe?
        questions: data.questionsConnection.edges.map(
          compose(
            questionWithFullUrl,
            questionEdgeToNode,
          ),
        ),
        handleLoadMore: () =>
          // fetchMore(fetchMoreOptions): Promise<ApolloQueryResult>
          fetchMore({
            variables: {
              cursor: data.questionsConnection.pageInfo.endCursor,
            },
            updateQuery,
          }),
      });
    }}
  </Query>
);

ListConnector.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ListConnector;
