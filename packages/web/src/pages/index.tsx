import Button from '@material-ui/core/Button';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import AppFooter from '../components/AppFooter';
import AppFrame from '../components/AppFrame';
import Link from '../components/Link';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			flex: '1 0 100%',
		},
		hero: {
			minHeight: '95vh',
			flex: '0 0 auto',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor:
				theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.primary.dark,
			color: theme.palette.primary.contrastText,
		},
		content: {
			paddingTop: theme.spacing(8),
			paddingBottom: theme.spacing(8),
			[theme.breakpoints.up('sm')]: {
				paddingTop: theme.spacing(12),
				paddingBottom: theme.spacing(10),
			},
		},
		text: {
			paddingLeft: theme.spacing(4),
			paddingRight: theme.spacing(4),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		headline: {
			maxWidth: 500,
			textAlign: 'center',
		},
		button: {
			marginTop: theme.spacing(3),
		},
		logo: {
			margin: '20px 0',
			width: '100%',
			height: '35vw',
			maxHeight: 200,
		},
		backers: {
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(2),
			display: 'flex',
			justifyContent: 'center',
			minHeight: 600,
		},
		backersBody: {
			maxWidth: theme.spacing(90),
		},
	});

const PageHome = props => {
	const classes = props.classes;

	return (
		<AppFrame>
			<div className={classes.root}>
				<Head>
					<title>OliMAT</title>
				</Head>
				<div className={classes.hero}>
					<div className={classes.content}>
						<img
							src="/static/images/material-ui-logo.svg"
							alt="Material-UI Logo"
							className={classes.logo}
						/>
						<div className={classes.text}>
							<Typography variant="h3" component="h1" color="inherit" gutterBottom>
								{'Olimpíadas de Matemática da UNEMAT'}
							</Typography>
							<Typography variant="h5" component="h2" color="inherit" className={classes.headline}>
								{'Inscrições abertas de 21 de fevereiro a 2 de abril.'}
							</Typography>
							<Button
								component={buttonProps => (
									<Link
										// @ts-ignore
										variant="button"
										prefetch
										href="/getting-started/installation"
										{...buttonProps}
									/>
								)}
								className={classes.button}
								variant="contained"
							>
								{'Inscreva-se'}
							</Button>
						</div>
					</div>
				</div>
				<div className={classes.backers}>Here were the NoSSR and MarkdownElement components...</div>
				<AppFooter />
			</div>
		</AppFrame>
	);
};

PageHome.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageHome);
