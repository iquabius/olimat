import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { MouseEventHandler } from 'react';

import Link from './Link';

const styles = ({ palette, typography }: Theme) =>
	createStyles({
		item: {
			display: 'block',
			paddingTop: 0,
			paddingBottom: 0,
		},
		itemLeaf: {
			display: 'flex',
			paddingTop: 0,
			paddingBottom: 0,
		},
		button: {
			letterSpacing: 0,
			justifyContent: 'flex-start',
			textTransform: 'none',
			width: '100%',
		},
		buttonLeaf: {
			letterSpacing: 0,
			justifyContent: 'flex-start',
			textTransform: 'none',
			width: '100%',
			fontWeight: typography.fontWeightRegular,
			'&.depth-0': {
				fontWeight: typography.fontWeightMedium,
			},
		},
		active: {
			color:
				palette.type === 'light' ? palette.primary.main : palette.primary.light,
			fontWeight: typography.fontWeightMedium,
		},
	});

interface Props extends WithStyles<typeof styles> {
	depth: number;
	href?: string;
	onClick?: MouseEventHandler;
	openImmediately?: boolean;
	title: string;
}

interface State {
	open: boolean;
}

class AppDrawerNavItem extends React.Component<Props, State> {
	static defaultProps = {
		openImmediately: false,
	};

	state = {
		open: this.props.openImmediately,
	};

	componentDidMount() {
		// So we only run this logic once.
		if (!this.props.openImmediately) {
			return;
		}

		// Center the selected item in the list container.
		const activeElement = document.querySelector(
			`.${this.props.classes.active}`,
		);
		if (activeElement && activeElement.scrollIntoView) {
			activeElement.scrollIntoView({});
		}
	}

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};

	render() {
		const {
			children,
			classes,
			depth,
			href,
			onClick,
			openImmediately,
			title,
			...other
		} = this.props;

		const style = {
			paddingLeft: 8 * (3 + 2 * depth),
		};

		if (href) {
			return (
				<ListItem className={classes.itemLeaf} disableGutters {...other}>
					<Button
						component={Link}
						naked
						activeClassName={classes.active}
						href={href}
						className={clsx(classes.buttonLeaf, `depth-${depth}`)}
						disableTouchRipple
						onClick={onClick}
						style={style}
					>
						{title}
					</Button>
				</ListItem>
			);
		}

		return (
			<ListItem className={classes.item} disableGutters {...other}>
				<Button
					classes={{
						root: classes.button,
						label: openImmediately ? 'algolia-lvl0' : '',
					}}
					onClick={this.handleClick}
					style={style}
				>
					{title}
				</Button>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					{children}
				</Collapse>
			</ListItem>
		);
	}
}

export default withStyles(styles)(AppDrawerNavItem);
