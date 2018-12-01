/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext, { updatePageContext } from '../utils/getPageContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import { graphql } from 'react-apollo';
import { paletteTypeQuery } from '../utils/localApollo';

// Inject the <!--insertion-point-jss--> at the end of <head> (see pages/_document.js)
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const endOfHeadInsertionPoint = document.querySelector('#end-of-head-insertion-point');

  if (document.head && endOfHeadInsertionPoint) {
    document.head.insertBefore(styleNode, endOfHeadInsertionPoint);
  }
}

class AppWrapper extends React.Component {
  state = {};

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.pageContext === 'undefined') {
      return {
        prevProps: nextProps,
        // Acredito que getPageContext() nunca será executado aqui,
        // pois OliApp sempre cria um 'pageContext'. Veja _app:constructor()
        pageContext: nextProps.pageContext || getPageContext(),
      };
    }

    const { prevProps } = prevState;

    // uiTheme is the result of paletteTypeQuery, so it has other properties
    // besides paletteType, like fetchMore, loading, refetch, etc.
    if (nextProps.uiTheme.paletteType !== prevProps.pageContext.theme.type) {
      return {
        prevProps: nextProps,
        pageContext: updatePageContext(nextProps.uiTheme),
      };
    }

    return null;
  }

  render() {
    const { children } = this.props;
    const { pageContext } = this.state;

    return (
      <JssProvider
        jss={pageContext.jss}
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
      >
        <MuiThemeProvider theme={pageContext.theme} sheetsManager={pageContext.sheetsManager}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  pageContext: PropTypes.object,
};

export default graphql(paletteTypeQuery, { name: 'uiTheme' })(AppWrapper);
