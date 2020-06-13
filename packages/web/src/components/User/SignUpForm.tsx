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
import ApolloClient from 'apollo-client';
import cookie from 'cookie';
import gql from 'graphql-tag';
import React, { FormEventHandler } from 'react';
import { compose, FetchResult, graphql, MutationFn, NamedProps, withApollo } from 'react-apollo';

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

interface Props extends WithStyles<typeof styles> {
	handleCreateUser: FormEventHandler;
}

class SignUpForm extends React.Component<Props> {
	state = {
		password: '',
		showPassword: false,
	};

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	handleMouseDownPassword = event => {
		event.preventDefault();
	};

	handleClickShowPasssword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.signUpBox}>
				<Typography className={classes.signUpHead} variant="h5">
					Crie uma conta!
				</Typography>
				<Divider />
				<form onSubmit={this.props.handleCreateUser}>
					<TextField
						id="name"
						name="name"
						label="Nome"
						margin="normal"
						fullWidth
						onChange={this.handleChange('name')}
					/>
					<TextField
						id="email"
						name="email"
						label="Email"
						margin="normal"
						fullWidth
						onChange={this.handleChange('email')}
					/>
					<TextField
						id="confirmEmail"
						name="confirmEmail"
						label="Confirmar email"
						margin="normal"
						fullWidth
						onChange={this.handleChange('confirmEmail')}
					/>
					<FormControl fullWidth margin="normal">
						<InputLabel htmlFor="password">Senha</InputLabel>
						<Input
							id="password"
							name="password"
							inputProps={{ className: classes.passwordInput }}
							type={this.state.showPassword ? 'text' : 'password'}
							value={this.state.password}
							onChange={this.handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										style={{ width: 'auto' }}
										onClick={this.handleClickShowPasssword}
										onMouseDown={this.handleMouseDownPassword}
									>
										{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
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
				<Typography className={classes.helpMessage} variant="caption" align="center">
					Já possui uma conta?{' '}
					<Link variant="primary" href="/login">
						Faça login aqui.
					</Link>
				</Typography>
			</Paper>
		);
	}
}

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

interface InputProps {
	client: ApolloClient<any>;
}

export default compose(
	withStyles(styles),
	// withApollo exposes `this.props.client` used when logging out
	withApollo,
	graphql<InputProps, Response, Variables, {}>(
		gql`
			mutation Create($name: String!, $email: String!, $password: String!) {
				signup(name: $name, email: $email, password: $password) {
					token
				}
			}
		`,
		{
			// Use an unambiguous name for use in the `props` section below
			name: 'createWithEmail',
			// Apollo's way of injecting new props which are passed to the component
			props: ({
				createWithEmail,
				// `client` is provided by the `withApollo` HOC
				ownProps: { client },
			}: NamedProps<{ createWithEmail: MutationFn<Response, Variables> }, InputProps>) => ({
				// `handleCreateUser` is the name of the prop passed to the component
				handleCreateUser: event => {
					/* global FormData */
					const data = new FormData(event.target);

					event.preventDefault();
					event.stopPropagation();

					createWithEmail({
						variables: {
							email: data.get('email').toString(),
							password: data.get('password').toString(),
							name: data.get('name').toString(),
						},
					})
						.then(({ data: { signup: { token } } }: FetchResult<Response>) => {
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
						})
						.catch(error => {
							// Something went wrong, such as incorrect password, or no network
							// available, etc.
							console.error(error);
						});
				},
			}),
		},
	),
)(SignUpForm);
