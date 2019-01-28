// tslint:disable:no-empty
import Router, { PopStateCallback, RouterProps, WithRouterProps } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

const FakePrefetch: React.FunctionComponent = props => <div />;

export const mockRouter: RouterProps = {
  asPath: '/',
  route: '/',
  pathname: '/',
  query: {},
  components: {},
  // TODO: Properly mock the following methods
  back() {},
  beforePopState: (cb: PopStateCallback) => undefined,
  prefetch: async (url: string) => FakePrefetch,
  push(href, as, options) {
    this.pathname = href;
    return new Promise(resolve => resolve());
  },
  reload: async (route: string) => {},
  replace: async () => true,
  events: {
    // TODO: Implement EventEmitter
    on() {},
    off() {},
  },
};

Router.router = mockRouter;

// API de contexto antiga do React
// https://github.com/zeit/next.js/issues/5205#issuecomment-422846339
export default class MockNextContext extends React.Component<WithRouterProps> {
  static propTypes = {
    // children: PropTypes.node.isRequired,
    headManager: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    headManager: PropTypes.object,
    router: PropTypes.object,
  };

  getChildContext() {
    const { router } = this.props;
    return {
      // tslint:disable-next-line:prefer-object-spread
      router: Object.assign(mockRouter, router),
    };
  }

  render() {
    return this.props.children;
  }
}
