import {
	Button,
	CircularProgress,
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from '@material-ui/core';
import React, { MouseEventHandler } from 'react';

const styles = ({ breakpoints, palette, spacing }: Theme) =>
	createStyles({
		loadMoreButton: {
			color:
				palette.type === 'light' ? palette.primary.main : palette.primary.light,
			borderColor:
				palette.type === 'light' ? palette.primary.main : palette.primary.light,
			width: '100%',
			// Centraliza o botão verticalmente
			marginLeft: 'auto',
			marginRight: 'auto',
			display: 'table',
			// Fixa a altura, porque o CircularProgress aumenta o botão
			height: 40,
		},
		// How does this influence TypeScript types in WithStyles<typeof styles> below
		[breakpoints.up('sm')]: {
			loadMoreButton: {
				width: '49%',
			},
		},
		[breakpoints.up('md')]: {
			loadMoreButton: {
				maxWidth: '32%',
			},
		},
	});

interface Props extends WithStyles<typeof styles> {
	hasMore: boolean;
	loadingMore: boolean;
	onLoadMore: MouseEventHandler;
}

class LoadMoreButton extends React.Component<Props> {
	state = {
		tooLong: false,
	};

	// Contador usado p/ atrasar a apresentação da animação do CircularProgress.
	// Veja: https://www.nngroup.com/articles/response-times-3-important-limits/
	tooLongTimer = undefined;

	UNSAFE_componentWillReceiveProps({ loadingMore }) {
		const { tooLong } = this.state;
		if (loadingMore === this.props.loadingMore) {
			// console.log('loadingMore is the same. leaving...');
			return;
		}
		// console.log(`tooLong: ${tooLong} | loadingMore: ${loadingMore}`);
		// console.log(`Timer: ${this.tooLongTimer}`);

		// Apollo Client está carregando os dados, mas não faz nem 800ms
		if (!this.tooLongTimer && loadingMore && !tooLong) {
			// console.log('Setting timer');
			// Depois de 800ms o usuário precisa saber que ainda estamos esperando
			this.tooLongTimer = setTimeout(() => {
				// console.log(`Timeout: tooLong is true.`);
				this.setState({ tooLong: true });
			}, 800);

			// Se o Apollo Client não está mais carregando, e tooLong = true,
			// quer dizer que os dados já foram carregados.
		} else if (!loadingMore && tooLong) {
			// Então precisamos zerar o contador.
			this.setState({ tooLong: false });
			clearTimeout(this.tooLongTimer);
			this.tooLongTimer = undefined;
			// console.log('Timer cleared');

			// Se um contador foi disparado, tooLong = false, e loadingMore = false,
			// então os dados foram carregados antes dos 800ms.
		} else if (this.tooLongTimer && !tooLong) {
			this.setState({ tooLong: false });
			clearTimeout(this.tooLongTimer);
			this.tooLongTimer = undefined;
			// console.log(`Very fast fetching, clearing timer: ${this.tooLongTimer}`);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.tooLongTimer);
	}

	render() {
		const { children, classes, loadingMore, hasMore, onLoadMore } = this.props;
		const { tooLong } = this.state;

		return (
			<Button
				onClick={onLoadMore}
				disabled={loadingMore || !hasMore}
				className={classes.loadMoreButton}
				size="large"
				variant="outlined"
			>
				{/* TODO: Extrair a lógica do contador para <DelayedCircularProgress /> */}
				{loadingMore && tooLong ? <CircularProgress size={22} /> : children}
			</Button>
		);
	}
}

export default withStyles(styles)(LoadMoreButton);
