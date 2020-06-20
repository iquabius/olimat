import {
	createStyles,
	Theme,
	Typography,
	withStyles,
	WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import ChoicesBox from '../Question/ChoicesBox';
import { Question } from '../Question/DetailsConnector';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			textAlign: 'justify',
			padding: theme.spacing(2),
		},
		questionNumber: {
			fontWeight: 'bold',
		},
		questionImg: {
			display: 'block',
			margin: 'auto',
			marginBottom: theme.spacing(3),
			marginTop: theme.spacing(),
			maxWidth: '100%',
		},
		choices: {
			marginBottom: theme.spacing(4),
		},
	});

interface Props extends WithStyles<typeof styles> {
	className?: string;
	question: Question;
	questionNumber: number;
}

const ExamQuestionItem: React.FunctionComponent<Props> = ({
	classes,
	className,
	questionNumber,
	question,
}) => (
	<div className={clsx(classes.root, className)}>
		<Typography gutterBottom paragraph>
			<span
				className={classes.questionNumber}
			>{`Questão ${questionNumber}) `}</span>
			{question.wording}
		</Typography>
		{question.imageFullUrl && (
			<img
				className={classes.questionImg}
				src={question.imageFullUrl}
				alt="Imagem da questão"
			/>
		)}
		{question.choices && question.choices.length > 0 && (
			<ChoicesBox choices={question.choices} className={classes.choices} />
		)}
	</div>
);

export default withStyles(styles)(ExamQuestionItem);
