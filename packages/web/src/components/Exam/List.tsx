import {
	createStyles,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Theme,
	withStyles,
	WithStyles,
} from '@material-ui/core';
import { ListItemProps } from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';

import Link from '../Link';

import ListConnector from './ListConnector';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			...theme.shape,
			backgroundColor: theme.palette.background.paper,
		},
	});

// https://material-ui.com/components/lists/#SimpleList.tsx
interface ExamItemProps extends ListItemProps<typeof Link, { button?: true }> {}

const ExamItemLink: React.FunctionComponent<ExamItemProps> = (props) => {
	return <ListItem button={true} dense component={Link} {...props} />;
};

interface Props extends WithStyles<typeof styles> {}

const ExamList: React.FunctionComponent<Props> = ({ classes }) => {
	return (
		<ListConnector>
			{({ exams }) => (
				<List className={classes.root}>
					{exams.map((exam) => (
						<ExamItemLink
							key={exam.id}
							href={`/admin/provas/detalhes?id=${exam.id}`}
						>
							<ListItemText primary={exam.title} />
							<ListItemSecondaryAction>
								<IconButton aria-label="Editar prova">
									<EditIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ExamItemLink>
					))}
				</List>
			)}
		</ListConnector>
	);
};

export default withStyles(styles)(ExamList);
