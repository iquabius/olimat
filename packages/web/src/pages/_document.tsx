// import { Theme } from '@material-ui/core';
import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { themeColor } from '../components/ThemeContext';

class MyDocument extends Document {
	render() {
		return (
			<html lang="en" dir="ltr">
				<Head>
					<meta charSet="utf-8" />
					{/* Use minimum-scale=1 to enable GPU rasterization */}
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
					/>
					{/* PWA primary color */}
					<meta name="theme-color" content={themeColor} />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
					/>
					<link rel="shortcut icon" href="/static/favicon.ico" />
					{/* Importa globalmente porque o @zeit/next-css está bugado */}
					<link href="/static/css/filepond.css" rel="stylesheet" />
					<link href="/static/css/filepond-plugin-image-preview.css" rel="stylesheet" />
					<style id="end-of-head-insertion-point" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

MyDocument.getInitialProps = async ctx => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: App => props => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	let css = sheets.toString();
	// TODO: Configurar prefixer e minifier (ver material-ui/docs)

	return {
		...initialProps,
		styles: [
			...React.Children.toArray(initialProps.styles),
			// eslint-disable-next-line react/jsx-key
			<style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />,
		],
	};
};

export default MyDocument;
