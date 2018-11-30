import React from 'react';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import initApollo from './initApollo';

const parseCookies = (req, options = {}) =>
  cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);

// Gets the display name of a JSX component for dev tools
const getDisplayName = ({ displayName, name }) => displayName || name || 'Unknown';

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getDisplayName(ComposedComponent)})`;

    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      const apollo = initApollo({}, { getToken: () => parseCookies(req).token });
      ctx.ctx.apolloClient = apollo;

      // Evaluate the composed component's getInitialProps()
      let componentProps = {};
      if (ComposedComponent.getInitialProps) {
        componentProps = await ComposedComponent.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          const app = (
            <ApolloProvider client={apollo}>
              <ComposedComponent
                {...componentProps}
                Component={Component}
                router={router}
                apolloClient={apollo}
              />
            </ApolloProvider>
          );
          await getDataFromTree(app);
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          // eslint-disable-next-line no-console
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
        ...componentProps,
      };
    }

    constructor(props) {
      super(props);
      // Note: Apollo should never be used on the server side beyond the initial
      // render within `getInitialProps()` above (since the entire prop tree
      // will be initialized there), meaning the below will only ever be
      // executed on the client.
      this.apollo = initApollo(this.props.apolloState, {
        getToken: () => parseCookies().token,
      });
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
