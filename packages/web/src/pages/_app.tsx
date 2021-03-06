import find from 'lodash/find';
import App from 'next/app';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';
// @ts-ignore
// import { Router as Router2, useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import PageContext, { LoggedInUser } from '../components/PageContext';
import checkLoggedIn from '../utils/checkLoggedIn';
import { withApollo } from '../utils/apollo';
import { ThemeProvider } from '../components/ThemeContext';
import { pages } from '../pages';

function findActivePage(currentPages, pathname) {
	const activePage = find(currentPages, (page) => {
		if (page.children) {
			return pathname.indexOf(page.pathname) === 0;
		}

		// Should be an exact match if no children
		return pathname === page.pathname;
	});

	if (!activePage) {
		return null;
	}

	// We need to drill down
	if (activePage.pathname !== pathname) {
		return findActivePage(activePage.children, pathname);
	}

	return activePage;
}

// Configure JSS
const jss = create({
	plugins: [...jssPreset().plugins],
	insertionPoint: process.browser
		? (document.querySelector('#insertion-point-jss') as HTMLElement)
		: null,
});

function AppWrapper(props) {
	const { children, pageProps, router } = props;

	// const router = useRouter();
	console.log('AppWrapper -> router: ', { pathname: router.pathname });

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	let pathname = router.pathname;
	// Add support for leading / in development mode.
	if (pathname !== '/') {
		// The leading / is only added to support static hosting (resolve /index.html).
		// We remove it to normalize the pathname.
		// See `_rewriteUrlForNextExport` on Next.js side.
		pathname = pathname.replace(/\/$/, '');
	}
	// console.log(pages, { ...router, pathname })
	const activePage = findActivePage(pages, pathname);

	return (
		<React.Fragment>
			<PageContext.Provider
				value={{ activePage, pages, loggedInUser: pageProps.loggedInUser }}
			>
				<StylesProvider jss={jss}>
					<ThemeProvider>{children}</ThemeProvider>
				</StylesProvider>
			</PageContext.Provider>
			{/* <PersistState /> */}
		</React.Fragment>
	);
}

interface Props {
	loggedInUser: LoggedInUser;
}

// @types/next doesn't allow us to use state with the App component
class OliApp extends App<Props> {
	render() {
		const { Component, pageProps, router } = this.props;
		console.log('OliApp.render() -> props: ', Object.keys(this.props));
		console.log('OliApp.render() -> props -> router: ', {
			pathname: router.pathname,
		});

		return (
			<AppWrapper pageProps={pageProps} router={router}>
				<SnackbarProvider maxSnack={3}>
					<Component {...pageProps} />
				</SnackbarProvider>
			</AppWrapper>
		);
	}
}

OliApp.getInitialProps = async (appCtx) => {
	const { Component, ctx } = appCtx;
	console.log('OliApp.getInitialProps -> appCtx: ', Object.keys(appCtx));
	console.log('OliApp.getInitialProps -> appCtx -> Component: ', Component);
	console.log('OliApp.getInitialProps -> appCtx -> router: ', {
		pathname: appCtx.router.pathname,
	});
	// TODO: Find another way to check logged user to allow Next.js'
	// automatic static optimization:
	// https://nextjs.org/blog/next-9#automatic-static-optimization
	// For now we don't need to show logged user in the home page for example.
	const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	pageProps = {
		...pageProps,
		// It looks like this shouldn't be nested here.
		// C+shift+F "loggedInUser" to check usage.
		loggedInUser,
	};

	console.log('OliApp.getInitialProps -> pageProps: ', Object.keys(pageProps));
	return { pageProps };
};

export default withApollo(OliApp);
