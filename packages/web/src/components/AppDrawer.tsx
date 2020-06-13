import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import React, { ReactEventHandler } from 'react';

import { pageToTitle } from '../utils/helpers';

import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './Link';
import PageContext from './PageContext';

const styles = ({ palette }: Theme) =>
	createStyles({
		paper: {
			width: 250,
			backgroundColor: palette.background.paper,
		},
		title: {
			color: palette.text.secondary,
			'&:hover': {
				color: palette.type === 'light' ? palette.primary.main : palette.primary.light,
				textDecoration: 'none',
			},
		},
		// https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
		toolbarIe11: {
			display: 'flex',
		},
		toolbar: {
			flexGrow: 1,
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		anchor: {
			color: palette.text.secondary,
		},
	});

function renderNavItems({ pages, ...params }) {
	return (
		// I don't know how to type this rest operator...
		// @ts-ignore
		<List>{pages.reduce((items, page) => reduceChildRoutes({ items, page, ...params }), [])}</List>
	);
}

function reduceChildRoutes({ props, activePage, items, page, depth }) {
	if (page.displayNav === false) {
		return items;
	}

	if (page.children && page.children.length > 1) {
		const title = pageToTitle(page);
		const openImmediately = activePage.pathname.indexOf(`${page.pathname}/`) === 0;

		items.push(
			<AppDrawerNavItem depth={depth} key={title} openImmediately={openImmediately} title={title}>
				{renderNavItems({ props, pages: page.children, activePage, depth: depth + 1 })}
			</AppDrawerNavItem>,
		);
	} else {
		const title = pageToTitle(page);
		// eslint-disable-next-line no-param-reassign
		page = page.children && page.children.length === 1 ? page.children[0] : page;

		items.push(
			<AppDrawerNavItem
				depth={depth}
				key={title}
				title={title}
				href={page.pathname}
				onClick={props.onClose}
			/>,
		);
	}

	return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
// https://github.com/zeit/next.js/issues/2177
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

interface Props extends WithStyles<typeof styles> {
	className?: string;
	disablePermanent: boolean;
	mobileOpen: boolean;
	onClose: ReactEventHandler;
	onOpen: ReactEventHandler;
}

const AppDrawer: React.FunctionComponent<Props> = props => {
	const { classes, className, disablePermanent, mobileOpen, onClose, onOpen } = props;

	const drawer = (
		<PageContext.Consumer>
			{({ activePage, pages }) => (
				<React.Fragment>
					<div className={classes.toolbarIe11}>
						<Toolbar className={classes.toolbar}>
							<Link className={classes.title} href="/" onClick={onClose}>
								<Typography variant="h3" color="inherit">
									OliMAT
								</Typography>
							</Link>
							<Divider absolute />
						</Toolbar>
					</div>
					{renderNavItems({ props, pages, activePage, depth: 0 })}
				</React.Fragment>
			)}
		</PageContext.Consumer>
	);

	return (
		<nav className={className}>
			<Hidden lgUp={!disablePermanent} implementation="js">
				<SwipeableDrawer
					classes={{
						paper: classNames(classes.paper, 'algolia-drawer'),
					}}
					disableBackdropTransition={!iOS}
					variant="temporary"
					open={mobileOpen}
					onOpen={onOpen}
					onClose={onClose}
					ModalProps={{
						keepMounted: true,
					}}
				>
					{drawer}
				</SwipeableDrawer>
			</Hidden>
			{disablePermanent ? null : (
				<Hidden mdDown implementation="css">
					<Drawer
						classes={{
							paper: classes.paper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			)}
		</nav>
	);
};

export default withStyles(styles)(AppDrawer);
