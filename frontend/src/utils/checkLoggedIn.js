import gql from 'apollo-boost';

export default (context, apolloClient) =>
  apolloClient
    .query({
      query: gql`
        query getUser {
          me {
            id
            name
          }
        }
      `,
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
