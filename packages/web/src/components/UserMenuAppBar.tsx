import { Menu, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import cookie from 'cookie';
import React from 'react';
import { useApolloClient } from '@apollo/client';

import redirect from '../utils/redirect';

import Link, { LinkProps } from './Link';
import PageContext from './PageContext';

const UserMenuAppBar: React.FC = (props) => {
	const [state, setState] = React.useState({ anchorEl: null });
	const client = useApolloClient();

	const handleMenu = (event) => {
		setState({ anchorEl: event.currentTarget });
	};

	const handleClose = () => {
		setState({ anchorEl: null });
	};

	const handleLogout = () => {
		document.cookie = cookie.serialize('token', '', {
			maxAge: -1, // Expire the cookie immediately
		});

		// Force a reload of all the current queries now that the user is
		// logged out, so we don't accidentally leave any state around.
		client.cache.reset().then(() => {
			// Redirect to a more useful page when signed out
			redirect({}, '/login');
		});
	};

	const { anchorEl } = state;
	const open = Boolean(anchorEl);

	return (
		<PageContext.Consumer>
			{({ loggedInUser }) => {
				if (loggedInUser.me) {
					return (
						<div>
							<IconButton
								aria-owns={open ? 'menu-appbar' : null}
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Perfil</MenuItem>
								<MenuItem onClick={handleClose}>Minha Conta</MenuItem>
								<MenuItem onClick={handleLogout}>Sair</MenuItem>
							</Menu>
						</div>
					);
				}
				return (
					// https://github.com/mui-org/material-ui/issues/16647
					// @ts-ignore Passing a component makes the "href" required
					<Button color="inherit" component={LoginLink}>
						Login
					</Button>
				);
			}}
		</PageContext.Consumer>
	);
};

const LoginLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
	(props, ref) => <Link href="/login" naked ref={ref} {...props} />,
);
LoginLink.displayName = 'LoginLink';

export default UserMenuAppBar;
