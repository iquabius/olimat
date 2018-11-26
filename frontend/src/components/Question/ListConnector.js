import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, compose } from 'react-apollo';
import { questionWithFullUrl } from './DetailsConnector';
import { withState } from 'recompose';

export const questionsConnectionQuery = gql`
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

const ListConnector = ({ children, hasMore, loadingMore, setHasMore, setLoadingMore }) => (
  <Query query={questionsConnectionQuery}>
    {({ data, error, fetchMore, loading }) => {
      if (loading) return <p>Carregando questões...</p>;
      if (error) return <p>{`Erro ao carregar questões: ${error}`}</p>;

      const questions = data.questionsConnection.edges.map(
        compose(
          questionWithFullUrl,
          questionEdgeToNode,
        ),
      );
      const loadMoreHandler = async () => {
        setLoadingMore(true);
        // A função fetchMore() do Apollo Client retorna Promise<ApolloQueryResult>
        const result = await fetchMore({
          variables: {
            cursor: data.questionsConnection.pageInfo.endCursor,
          },
          updateQuery,
        });
        setHasMore(result.data.questionsConnection.pageInfo.hasNextPage);
        setLoadingMore(false);
        return result;
      };

      return children({
        // Move this logic to responseToFormValues() maybe?
        questions,
        loadingMore,
        hasMore,
        loadMoreHandler,
      });
    }}
  </Query>
);

ListConnector.propTypes = {
  children: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  setHasMore: PropTypes.func.isRequired,
  setLoadingMore: PropTypes.func.isRequired,
};

export default compose(
  withState('hasMore', 'setHasMore', true),
  withState('loadingMore', 'setLoadingMore', false),
)(ListConnector);
