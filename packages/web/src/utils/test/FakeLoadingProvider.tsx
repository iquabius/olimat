// import React from 'react';
// import PropTypes from 'prop-types';
// import { ApolloLink, Observable } from 'apollo-link';
// import ApolloClient from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloProvider } from '@apollo/client';

// const FakeLoadingProvider = ({ children }) => {
//   const client = new ApolloClient({
//     link: new ApolloLink(() => new Observable(() => {})),
//     cache: new InMemoryCache(),
//   });

//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };

// FakeLoadingProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default FakeLoadingProvider;
