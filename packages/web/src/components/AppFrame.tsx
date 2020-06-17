import {
	createStyles,
	Theme,
	Tooltip,
	WithStyles,
	CssBaseline,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NProgressBar from '@material-ui/docs/NProgressBar';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { ReactNode } from 'react';

import AppDrawer from './AppDrawer';
import { useChangeTheme } from './ThemeContext';
import PageTitle from './PageTitle';
import UserMenuAppBar from './UserMenuAppBar';

// https://github.com/zeit/next.js/issues/4863
Router.events.on('routeChangeStart', () => {
	NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});

Router.events.on('routeChangeError', () => {
	NProgress.done();
});

const styles = (theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'stretch',
			minHeight: '100vh',
			width: '100%',
			backgroundColor: theme.palette.background.level1,
		},
		grow: {
			flex: '1 1 auto',
		},
		title: {
			marginLeft: 24,
			flex: '0 1 auto',
		},
		appBar: {
			transition: theme.transitions.create('width'),
			'@media print': {
				position: 'absolute',
			},
		},
		appBarHome: {
			boxShadow: 'none',
		},
		appBarShift: {
			[theme.breakpoints.up('lg')]: {
				width: 'calc(100% - 250px)',
			},
		},
		drawer: {
			[theme.breakpoints.up('lg')]: {
				width: 250,
			},
		},
		navIconHide: {
			[theme.breakpoints.up('lg')]: {
				display: 'none',
			},
		},
	});

interface Props extends WithStyles<typeof styles> {
	children: ReactNode;
}

function AppFrame(props: Props) {
	const { children, classes } = props;

	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setMobileOpen(true);
	};
	const handleDrawerClose = () => {
		setMobileOpen(false);
	};

	const theme = useTheme();
	const changeTheme = useChangeTheme();
	const handleTogglePaletteType = () => {
		const paletteType = theme.palette.type === 'light' ? 'dark' : 'light';

		changeTheme({ paletteType });
	};

	return (
		<PageTitle>
			{title => {
				let disablePermanent = false;
				let navIconClassName = '';
				let appBarClassName = classes.appBar;

				if (title === null) {
					// home route, don't shift app bar or dock drawer
					disablePermanent = true;
					appBarClassName += ` ${classes.appBarHome}`;
				} else {
					navIconClassName = classes.navIconHide;
					appBarClassName += ` ${classes.appBarShift}`;
				}
				// Disable box-shadow for pages wrapped by AppContent.
				// Those pages have a breadcrumb box.
				// if (RegExp('admin').test(activePage.pathname)) {
				//   appBarClassName += ` ${classes.appBarHome}`;
				// }

				return (
					<div className={classes.root}>
						<NProgressBar />
						<CssBaseline />
						<AppBar className={appBarClassName}>
							<Toolbar>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={handleDrawerOpen}
									className={navIconClassName}
								>
									<MenuIcon />
								</IconButton>
								{title !== null && (
									<Typography
										className={classes.title}
										variant="h6"
										color="inherit"
										noWrap
									>
										{title}
									</Typography>
								)}
								<div className={classes.grow} />
								<Tooltip title="Alternar tema claro/escuro" enterDelay={300}>
									<IconButton
										color="inherit"
										onClick={handleTogglePaletteType}
										aria-label="Alternar tema claro/escuro"
									>
										{theme.palette.type === 'light' ? (
											<Brightness4Icon />
										) : (
											<Brightness7Icon />
										)}
									</IconButton>
								</Tooltip>
								<UserMenuAppBar />
							</Toolbar>
						</AppBar>
						<AppDrawer
							className={classes.drawer}
							disablePermanent={disablePermanent}
							onClose={handleDrawerClose}
							onOpen={handleDrawerOpen}
							mobileOpen={mobileOpen}
						/>
						{children}
					</div>
				);
			}}
		</PageTitle>
	);
}

export default withStyles(styles, { name: 'AppFrame' })(AppFrame);
