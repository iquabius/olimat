import { createStyles, IconButton, Theme, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NextLink from 'next/link';
import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import ChoicesBox from './ChoicesBox';
import { Question } from './DetailsConnector';

const longWordingLines = 9;
const shortWordingLines = 4;

const styles = (theme: Theme) =>
	createStyles({
		card: {
			maxWidth: '100%',
			maxHeight: 300,
			marginBottom: theme.spacing(2),
		},
		[theme.breakpoints.up('sm')]: {
			card: {
				maxWidth: '49%',
			},
		},
		[theme.breakpoints.up('md')]: {
			card: {
				maxWidth: '32%',
			},
		},
		shortWording: {
			// Fixa a altura pro texto não deslocar a imagem antes de ser
			// 'podado' pelo <LinesEllipsis />
			height: 21 * shortWordingLines,
			overflow: 'hidden',
		},
		longWording: {
			// 21px por linha
			height: 21 * longWordingLines,
			overflow: 'hidden',
		},
		iconButton: {
			padding: 8,
		},
		media: {
			height: 140,
		},
		choices: {
			height: 140,
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
	});

interface Props extends WithStyles<typeof styles> {
	question: Question;
}

const ListItem: React.FunctionComponent<Props> = (props) => {
	const { classes, question } = props;
	const noImageNoChoices =
		!question.imageUrl && question.choices && question.choices.length === 0;
	const wordingClass = noImageNoChoices
		? classes.longWording
		: classes.shortWording;

	return (
		<Card className={classes.card}>
			<NextLink href={`/admin/questao?id=${question.id}`}>
				<CardActionArea>
					<CardContent>
						<Typography component="div" className={wordingClass}>
							<LinesEllipsis
								text={question.wording}
								maxLine={
									noImageNoChoices ? longWordingLines : shortWordingLines
								}
								ellipsis="..."
								trimRight
								basedOn="words"
							/>
						</Typography>
					</CardContent>
					{question.imageFullUrl && (
						<CardMedia
							className={classes.media}
							image={question.imageFullUrl}
						/>
					)}
					{!question.imageFullUrl &&
						question.choices &&
						question.choices.length > 0 && (
							<ChoicesBox
								choices={question.choices}
								className={classes.choices}
								dense
							/>
						)}
				</CardActionArea>
			</NextLink>
			<CardActions>
				<IconButton
					className={classes.iconButton}
					aria-label="Add to favorites"
				>
					<FavoriteIcon fontSize="small" />
				</IconButton>
				<IconButton
					className={classes.iconButton}
					aria-label="Add to favorites"
				>
					<CheckCircleIcon fontSize="small" />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default withStyles(styles)(ListItem);
