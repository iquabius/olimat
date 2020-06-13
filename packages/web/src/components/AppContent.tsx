import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

const styles = (theme: Theme) =>
	createStyles({
		wrapper: {
			width: '100%',
		},
		root: theme.mixins.gutters({
			paddingTop: 64 + theme.spacing(2),
			position: 'relative',
			flex: '1 1 100%',
			maxWidth: '100%',
			margin: '0 auto',
			marginBottom: theme.spacing(8),
		}),
		[theme.breakpoints.up(900 + theme.spacing(6))]: {
			root: {
				maxWidth: 900,
			},
		},
	});

interface Props extends WithStyles<typeof styles> {
	className?: string;
}

const AppContent: React.FunctionComponent<Props> = props => {
	const { className, classes, children } = props;

	return (
		<div className={classes.wrapper}>
			<div className={classNames(classes.root, className)}>{children}</div>
		</div>
	);
};

export default withStyles(styles)(AppContent);
