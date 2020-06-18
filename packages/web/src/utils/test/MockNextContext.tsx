import Router, { NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import PropTypes from 'prop-types';
import React from 'react';

export const mockRouter: NextRouter = {
	asPath: '/',
	route: '/',
	pathname: '/',
	query: {},
	// TODO: Properly mock the following methods
	back() {},
	beforePopState: cb => undefined,
	prefetch: (url: string) => null,
	push(href, as, options) {
		this.pathname = href;
		return new Promise(resolve => resolve());
	},
	reload: () => {},
	replace: async () => true,
	events: {
		// TODO: Implement EventEmitter
		emit() {},
		on() {},
		off() {},
	},
};

Router.router = Object.assign(mockRouter, Router.router);

// API de contexto antiga do React
// https://github.com/zeit/next.js/issues/5205#issuecomment-422846339
export default class MockNextContext extends React.Component<WithRouterProps> {
	static propTypes = {
		// children: PropTypes.node.isRequired,
		// 'headManager' may not be necessary anymore:
		// https://github.com/vercel/next.js/blob/9b999b1ce30f1bd4779e3cb33a41cce6467c2ebc/packages/next/client/with-router.tsx#L5
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
			router: Object.assign(mockRouter, router),
		};
	}

	render() {
		return this.props.children;
	}
}
