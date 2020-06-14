import {
	createStyles,
	FormControl,
	FormControlLabel,
	FormGroup,
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
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { FormEventHandler } from 'react';
import { compose, fromRenderProps } from 'recompose';

import Link from '../Link';

import LoginConnector, { LoginConnectorProps } from './LoginConnector';

const styles = (theme: Theme) =>
	createStyles({
		loginBox: {
			position: 'relative',
			width: 350,
			maxHeight: 390,
			padding: theme.spacing(4),
		},
		loginHead: {
			marginBottom: theme.spacing(2),
			textAlign: 'center',
		},
		passwordInput: {
			height: 'inherit',
		},
		loginButton: {
			marginTop: theme.spacing(2),
		},
		helpMessage: {
			marginTop: theme.spacing(2),
		},
	});

interface InnerProps {
	handleSignIn: FormEventHandler;
}

interface OuterProps extends WithStyles<typeof styles> {}

interface State {
	keepLoggedIn: boolean;
	password: string;
	showPassword: boolean;
}

const LoginForm: React.FC<InnerProps & OuterProps> = props => {
	const [state, setState] = React.useState<State>({
		password: '',
		showPassword: false,
		keepLoggedIn: false,
	});

	const handleChange = prop => event => {
		// https://reactjs.org/docs/events.html#event-pooling
		event.persist();
		setState(state => ({ ...state, [prop]: event.target.value } as any));
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const handleClickShowPasssword = () => {
		setState(state => ({
			...state,
			showPassword: !state.showPassword,
		}));
	};

	const handleCheckbox = event => {
		setState(state => ({ ...state, keepLoggedIn: event.target.checked }));
	};

	const { classes, handleSignIn } = props;
	const showPasswordAdornment = (
		<InputAdornment position="end">
			<IconButton
				style={{ width: 'auto' }}
				onClick={handleClickShowPasssword}
				onMouseDown={handleMouseDownPassword}
			>
				{state.showPassword ? <VisibilityOff /> : <Visibility />}
			</IconButton>
		</InputAdornment>
	);
	const keepLoggedInSwitch = (
		<Switch
			checked={state.keepLoggedIn}
			onChange={handleCheckbox}
			value="keepLoggedIn"
			color="primary"
		/>
	);

	return (
		<Paper className={classes.loginBox}>
			<Typography className={classes.loginHead} variant="h5">
				Acesse sua Conta
			</Typography>
			<Divider />
			<form onSubmit={handleSignIn}>
				<TextField
					id="email"
					name="email"
					label="Email"
					margin="normal"
					fullWidth
					onChange={handleChange('email')}
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
						endAdornment={showPasswordAdornment}
					/>
				</FormControl>
				<FormGroup row>
					<FormControlLabel
						control={keepLoggedInSwitch}
						label="Manter acesso"
					/>
				</FormGroup>
				{/* <Typography variant="caption">
            <Link href="#">Esqueceu a senha?</Link>
          </Typography> */}
				<Button
					aria-label="Entrar"
					className={classes.loginButton}
					fullWidth
					variant="contained"
					color="secondary"
					size="large"
					type="submit"
				>
					Entrar
				</Button>
			</form>
			<Typography
				className={classes.helpMessage}
				variant="caption"
				align="center"
			>
				Ainda não tem uma conta?{' '}
				<Link variant="primary" href="/criar_conta">
					Crie a sua aqui.
				</Link>
			</Typography>
		</Paper>
	);
};

interface RenderProps {
	handleSignIn: LoginConnectorProps['handleSignIn'];
}

const loginConnector = fromRenderProps<InnerProps, OuterProps, RenderProps>(
	LoginConnector,
	({ handleSignIn }) => ({ handleSignIn }),
);

export default compose(
	loginConnector,
	withStyles(styles),
)(LoginForm);
