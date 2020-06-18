import {
	createStyles,
	Paper,
	Theme,
	Typography,
	withStyles,
	WithStyles,
} from '@material-ui/core';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

import ExamDetailsConnector from './DetailsConnector';
import ExamQuestionItem from './QuestionItem';

const styles = (theme: Theme) =>
	createStyles({
		root: {},
		title: {
			padding: theme.spacing(),
			textAlign: 'center',
		},
		questionList: {
			display: 'flex',
			flexFlow: 'column wrap',
			justifyContent: 'space-between',
			alignContent: 'space-between',
			maxHeight: 2000,
		},
		question: {
			// Sempre que usarmos as propriedades 'padding' e 'width' juntas, é bom
			// adicionar "boxSizing: 'border-box'", para que a matemática fique o
			// mais simples possível.
			// boxSizing: 'border-box',
			// padding: theme.spacing(),
			width: '49.5%',
		},
	});

interface Props extends WithStyles<typeof styles> {}

const ExamDetails: React.FunctionComponent<Props> = ({ classes }) => {
	const router = useRouter();
	const id = router.query.id;
	if (!id) return <Error statusCode={404} />;

	return (
		<ExamDetailsConnector id={id.toString()}>
			{({ exam }) => {
				if (!exam) return <div>Essa prova não existe.</div>;

				return (
					<Paper className={classes.root}>
						<Typography className={classes.title} variant="h6">
							{exam.title}
						</Typography>
						<div className={classes.questionList} data-testid="questionList">
							{exam.questions.map((question, index) => (
								<ExamQuestionItem
									key={question.id}
									questionNumber={index + 1}
									className={classes.question}
									question={question}
								/>
							))}
						</div>
					</Paper>
				);
			}}
		</ExamDetailsConnector>
	);
};

export default withStyles(styles)(ExamDetails);
