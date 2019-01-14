import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';

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

  render() {
    const { children } = this.props;
    const { pageContext } = this.props;

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
  pageContext: PropTypes.object,
};

export default AppWrapper;
