import {
	createStyles,
	Fab,
	Theme,
	withStyles,
	WithStyles,
	FabProps,
} from '@material-ui/core';
import React from 'react';

const styles = (theme: Theme) =>
	createStyles({
		FAButton: {
			position: 'fixed',
			top: 'auto',
			left: 'auto',
			bottom: 23,
			right: 23,
			// Para o botão ficar por cima das imagens do Card
			zIndex: theme.zIndex.mobileStepper,
		},
	});

// Is there a better way to have FabProps & component props?
type FAButtonProps = WithStyles<typeof styles> &
	FabProps<React.ElementType, { component: React.ElementType }>;

const FAButton: React.FunctionComponent<FAButtonProps> = ({
	children,
	classes,
	component,
	onClick,
	...rest
}) => (
	<Fab
		component={component}
		onClick={onClick}
		color="secondary"
		className={classes.FAButton}
		{...rest}
	>
		{children}
	</Fab>
);

export default withStyles(styles)(FAButton);
