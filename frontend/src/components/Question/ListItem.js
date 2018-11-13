import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NextLink from 'next/link';
import LinesEllipsis from 'react-lines-ellipsis';
import ChoicesBox from './ChoicesBox';

const styles = theme => ({
  card: {
    maxWidth: 265,
    maxHeight: 300,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  iconButton: {
    padding: 8,
  },
  media: {
    height: 140,
  },
});

const ListItem = props => {
  const { classes, question } = props;
  const noImageNoChoices = !question.imageUrl && question.choices && question.choices.length === 0;
  return (
    <Card className={classes.card}>
      <NextLink href={`/admin/questao?id=${question.id}`}>
        <CardActionArea>
          <CardContent>
            <Typography component="div">
              <LinesEllipsis
                text={question.wording}
                maxLine={noImageNoChoices ? 9 : 4}
                ellipsis="..."
                trimRight
                basedOn="words"
              />
            </Typography>
            {!question.imageFullUrl &&
              question.choices &&
              question.choices.length > 0 && <ChoicesBox choices={question.choices} dense />}
          </CardContent>
          {question.imageFullUrl && <CardMedia className={classes.media} image={question.imageFullUrl} />}
        </CardActionArea>
      </NextLink>
      <CardActions>
        <IconButton className={classes.iconButton} aria-label="Add to favorites">
          <FavoriteIcon fontSize="small" />
        </IconButton>
        <IconButton className={classes.iconButton} aria-label="Add to favorites">
          <CheckCircleIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItem);
