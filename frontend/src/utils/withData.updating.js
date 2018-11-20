import React from 'react';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import initApollo from './initApollo';

function parseCookies(req, options = {}) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
}

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`;

    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(context) {
      const { req, res } = context;

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      const apollo = initApollo({}, { getToken: () => parseCookies(req).token });
      context.apolloClient = apollo;

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const router = {
          query: context.query,
          pathname: context.pathname,
          asPath: context.asPath,
        };

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent {...composedInitialProps} router={router} apolloClient={apollo} />
            </ApolloProvider>,
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        apolloState,
        ...composedInitialProps,
      };
    }

    constructor(props) {
      super(props);
      // Note: Apollo should never be used on the server side beyond the initial
      // render within `getInitialProps()` above (since the entire prop tree
      // will be initialized there), meaning the below will only ever be
      // executed on the client.
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token,
      });
    }

    // I dont't think we need to pass apolloClient as prop here...
    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ComposedComponent {...this.props} apolloClient={this.apolloClient} />
        </ApolloProvider>
      );
    }
  };
};
