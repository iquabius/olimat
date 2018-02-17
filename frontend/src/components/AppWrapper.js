/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import getPageContext from '../utils/getPageContext';
import AppFrame from './AppFrame';

class AppWrapper extends React.Component {
  componentWillMount() {
    this.pageContext = this.props.pageContext || getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  pageContext = null;

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider
        theme={this.pageContext.theme}
        sheetsManager={this.pageContext.sheetsManager}
      >
        <Reboot />
        <AppFrame>{children}</AppFrame>
      </MuiThemeProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.object,
};

export default AppWrapper;
