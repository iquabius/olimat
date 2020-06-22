import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

import Link from '../Link';
import FAButton from '../FAButton';
import LoadMoreButton from '../LoadMoreButton';

import ListConnector from './ListConnector';
import ListItem from './ListItem';

const styles = (theme: Theme) =>
	createStyles({
		grid: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
		},
	});

interface Props extends WithStyles<typeof styles> {}

const QuestionList: React.FC<Props> = props => {
	const { classes } = props;

	return (
		<React.Fragment>
			<FAButton
				aria-label="Adicionar questão"
				component={Link}
				href="/admin/questao-criar"
			>
				<AddIcon />
			</FAButton>
			<ListConnector>
				{({ questions, loadMoreHandler, loadingMore, hasMore }) => (
					<div>
						<div className={classes.grid}>
							{questions.map(question => (
								<ListItem key={question.id} question={question} />
							))}
						</div>
						<LoadMoreButton
							onLoadMore={loadMoreHandler}
							loadingMore={loadingMore}
							hasMore={hasMore}
						>
							Carregar mais questões
						</LoadMoreButton>
					</div>
				)}
			</ListConnector>
		</React.Fragment>
	);
};

export default withStyles(styles)(QuestionList);
