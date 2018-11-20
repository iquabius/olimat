/* eslint-disable no-underscore-dangle */

import '../utils/bootstrap';
import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import withData from '../utils/withData';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import getPageContext from '../utils/getPageContext';

// Inject the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  // const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  // if (document.head && docsearchStylesSheet) {
  document.head.insertBefore(styleNode, document.head.lastChild);
  // }
}

class MyApp extends App {
  // state = {};

  // constructor(props) {
  //   super(props);
  //   console.log('_app:constructor:getPageContext');
  //   // this.pageContext = { instanceOwner: '_app', ...getPageContext() };
  //   if (!MyApp.pageContext) {
  //     MyApp.pageContext = { instanceOwner: '_app', ...getPageContext() };
  //   }
  // }

  static pageContext;

  // static async getInitialProps({ Component, router, ctx }) {
  //   let pageProps = {};
  //   if (!MyApp.pageContext) {
  //     MyApp.pageContext = { instanceOwner: '_app', ...getPageContext() };
  //   }
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps, pageContext: MyApp.pageContext };
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('getDerivedStateFromProps');
  //   if (typeof prevState.pageContext === 'undefined') {
  //     console.log('getDerivedStateFromProps:getPageContext...');
  //     return {
  //       prevProps: nextProps,
  //       pageContext: nextProps.pageContext || { instanceOwner: '_app', ...getPageContext() },
  //     };
  //   }

  //   return null;
  // }

  componentWillMount() {
    MyApp.pageContext = this.props.pageContext ||
      MyApp.pageContext || { instanceOwner: '_app', ...getPageContext() };
    console.log(`_app:componentWillMount:getPageContext: ${MyApp.pageContext.instanceId}`);
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    // const { pageContext } = this.state;
    return (
      <Container>
        <Head>
          <title>OliMAT TITLE</title>
        </Head>
        <StylesProvider
          generateClassName={MyApp.pageContext.generateClassName}
          jss={MyApp.pageContext.jss}
          sheetsManager={MyApp.pageContext.sheetsManager}
          sheetsRegistry={MyApp.pageContext.sheetsRegistry}
        >
          <ThemeProvider theme={MyApp.pageContext.theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Component pageContext={MyApp.pageContext} {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
      </Container>
    );
  }
}

// O withData por ser incluído individualmente em cada página,
// caso alguma delas não precise do Apollo Client.
export default withData(MyApp);
