import {
	createStyles,
	FormControl,
	Input,
	InputAdornment,
	InputLabel,
	Theme,
	WithStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import cookie from 'cookie';
import { gql, FetchResult, useMutation, useApolloClient } from '@apollo/client';
import React, { FormEventHandler } from 'react';

import redirect from '@olimat/web/utils/redirect';
import Link from '../Link';

const styles = (theme: Theme) =>
	createStyles({
		signUpBox: {
			position: 'relative',
			width: 350,
			// maxHeight: 390,
			padding: theme.spacing(4),
		},
		signUpHead: {
			marginBottom: theme.spacing(2),
			textAlign: 'center',
		},
		passwordInput: {
			height: 'inherit',
		},
		signUpButton: {
			marginTop: theme.spacing(2),
		},
		helpMessage: {
			marginTop: theme.spacing(2),
		},
	});

interface Props extends WithStyles<typeof styles> {}

const signUpMutation = gql`
	mutation signUpMutation($name: String!, $email: String!, $password: String!) {
		signup(name: $name, email: $email, password: $password) {
			token
		}
	}
`;

const SignUpForm: React.FC<Props> = (props) => {
	const [state, setState] = React.useState({
		password: '',
		showPassword: false,
	});

	const [tryToSignUp, {}] = useMutation<Response, Variables>(signUpMutation);
	const client = useApolloClient();
	const handleCreateUser: FormEventHandler<HTMLFormElement> = (event) => {
		/* global FormData */
		const data = new FormData(event.currentTarget);

		event.preventDefault();
		event.stopPropagation();

		tryToSignUp({
			variables: {
				email: data.get('email').toString(),
				password: data.get('password').toString(),
				name: data.get('name').toString(),
			},
		})
			.then(
				({
					data: {
						signup: { token },
					},
				}: FetchResult<Response>) => {
					// Store the token in cookie
					document.cookie = cookie.serialize('token', token, {
						maxAge: 30 * 24 * 60 * 60, // 30 days
					});

					// Force a reload of all the current queries now that the user is
					// logged in
					client.resetStore().then(() => {
						// Now redirect to the homepage
						redirect({}, '/');
					});
				},
			)
			.catch((error) => {
				// Something went wrong, such as incorrect password, or no network
				// available, etc.
				console.error(error);
			});
	};

	const handleChange = (prop) => (event) => {
		event.persist();
		setState((state) => ({ ...state, [prop]: event.target.value }));
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClickShowPasssword = () => {
		setState((state) => ({ ...state, showPassword: !state.showPassword }));
	};

	const { classes } = props;
	return (
		<Paper className={classes.signUpBox}>
			<Typography className={classes.signUpHead} variant="h5">
				Crie uma conta!
			</Typography>
			<Divider />
			<form onSubmit={handleCreateUser}>
				<TextField
					id="name"
					name="name"
					label="Nome"
					margin="normal"
					fullWidth
					onChange={handleChange('name')}
				/>
				<TextField
					id="email"
					name="email"
					label="Email"
					margin="normal"
					fullWidth
					onChange={handleChange('email')}
				/>
				<TextField
					id="confirmEmail"
					name="confirmEmail"
					label="Confirmar email"
					margin="normal"
					fullWidth
					onChange={handleChange('confirmEmail')}
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel htmlFor="password">Senha</InputLabel>
					<Input
						id="password"
						name="password"
						inputProps={{ className: classes.passwordInput }}
						type={state.showPassword ? 'text' : 'password'}
						value={state.password}
						onChange={handleChange('password')}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									style={{ width: 'auto' }}
									onClick={handleClickShowPasssword}
									onMouseDown={handleMouseDownPassword}
								>
									{state.showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<Button
					aria-label="Criar conta"
					className={classes.signUpButton}
					fullWidth
					variant="contained"
					color="secondary"
					size="large"
					type="submit"
				>
					Criar conta
				</Button>
			</form>
			<Typography
				className={classes.helpMessage}
				variant="caption"
				align="center"
			>
				Já possui uma conta?{' '}
				<Link color="primary" href="/login">
					Faça login aqui.
				</Link>
			</Typography>
		</Paper>
	);
};

interface Response {
	signup: {
		token: string;
	};
}

interface Variables {
	name: string;
	email: string;
	password: string;
}

export default withStyles(styles)(SignUpForm);
