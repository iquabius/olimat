/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../utils/getPageContext';
import CssBaseline from '@material-ui/core/CssBaseline';

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

export default AppWrapper;
