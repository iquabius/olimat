import Router, { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import React from 'react';

export const mockRouter: NextRouter = {
	asPath: '/',
	route: '/',
	pathname: '/',
	query: {},
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
		emit() {},
		on() {},
		off() {},
	},
};

// TODO: Refactor tests to remove usage of this global Router singleton
Router.router = Object.assign(mockRouter, Router.router);

/**
 * This component mocks next/router. For now it does not work for next/head.
 *
 * Inspired by:
 * - https://w11i.me/next-js-userouter-testing
 * - https://github.com/vercel/next.js/issues/7479#issuecomment-498031927
 *
 * @param props
 */
export const MockNextContext: React.FC<{
	router: Partial<NextRouter>;
}> = props => {
	const { children, router } = props;
	const contextRouter = { ...mockRouter, ...router };

	return (
		<RouterContext.Provider value={contextRouter}>
			{children}
		</RouterContext.Provider>
	);
};

export default MockNextContext;

/**
 * This is a HoC that returns a component wrapped with Next's router.
 *
 * @param Component
 * @param router
 */
// export const withTestNextRouter = (
// 	Component: React.ComponentType,
// 	router: Partial<NextRouter> = {},
// ) => {
// 	const WithTestNextRouter: React.FC = props => {
// 		const contextRouter = { ...mockRouter, ...router };
// 		return (
// 			<RouterContext.Provider value={contextRouter}>
// 				<Component />
// 			</RouterContext.Provider>
// 		);
// 	};

// 	return WithTestNextRouter;
// };

/**
 * This is the original HoC from https://w11i.me/next-js-userouter-testing
 *
 * @param tree
 * @param router
 */
// export const withTestNextRouter2 = (
// 	tree: React.ReactElement,
// 	router: Partial<NextRouter> = {},
// ) => {
// 	const contextRouter = { ...mockRouter, ...router };

// 	return (
// 		<RouterContext.Provider value={contextRouter}>
// 			{tree}
// 		</RouterContext.Provider>
// 	);
// };
