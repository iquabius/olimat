import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

import { QuestionChoice } from './DetailsConnector';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			// Remove list-style e padding padrão da tag 'ul'
			listStyle: 'none',
			padding: 0,
			// Layout com flexBox
			display: 'flex',
			justifyContent: 'space-between',
			flexWrap: 'wrap',
			marginBottom: -2,
		},
		option: {
			...theme.typography.body2,
			paddingTop: theme.spacing(),
			paddingBottom: theme.spacing(),
		},
		dense: {
			width: 250,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			padding: theme.spacing(1 / 3),
		},
		optionLabel: {
			fontWeight: 'bold',
		},
	});

const optionLabels = ['a', 'b', 'c', 'd', 'e', 'f'];

interface Props extends WithStyles<typeof styles> {
	className?: string;
	choices: QuestionChoice[];
	dense?: boolean;
}

const ChoicesBox: React.FunctionComponent<Props> = ({ choices, dense, classes, className }) => {
	const optionClassName = dense ? classNames(classes.option, classes.dense) : classes.option;
	return (
		<ul className={classNames(classes.root, className)}>
			{choices.map((choice, index) => (
				<li key={choice.id} className={optionClassName}>
					<span className={classes.optionLabel}>{`${optionLabels[index]}) `}</span>
					{`${choice.text}`}
				</li>
			))}
		</ul>
	);
};

export default withStyles(styles)(ChoicesBox);
