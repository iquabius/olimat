import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

export const mockRouter = {
  asPath: '/',
  route: '/',
  pathname: '/',
  query: {},
  // TODO: Properly mock the following methods
  back() {},
  beforePopState() {},
  prefetch() {},
  push(href, as, options) {
    this.pathname = href;
    return new Promise(resolve => resolve());
  },
  reload() {},
  replace() {},
  events: {
    // TODO: Implement EventEmitter
    on() {},
    off() {},
    trigger() {},
  },
};

Router.router = mockRouter;

// API de contexto antiga do React
// https://github.com/zeit/next.js/issues/5205#issuecomment-422846339
export default class MockNextContext extends React.Component {
  static propTypes = {
    headManager: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    headManager: PropTypes.object,
    router: PropTypes.object,
  };

  getChildContext() {
    const { headManager, router } = this.props;
    return {
      headManager: {
        updateHead() {},
        ...headManager,
      },
      router: Object.assign(mockRouter, router),
    };
  }

  render() {
    return this.props.children;
  }
}

MockNextContext.propTypes = {
  children: PropTypes.node.isRequired,
};
