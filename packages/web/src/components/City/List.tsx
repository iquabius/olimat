import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import EditIcon from '@material-ui/icons/Edit';
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { withState, compose } from 'recompose';

import AddDialog from './AddDialog';
import DeleteItemButton from './DeleteItemButton';
import EditListItem from './EditListItem';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
			marginBottom: 32,
		},
	});

export const allCitiesQuery = gql`
	query allCitiesQuery {
		cities {
			id
			name
		}
	}
`;

interface Props extends WithStyles<typeof styles> {
	addDialogOpen: boolean;
	setAddDialogOpen: (open: boolean) => void;
}

const CityList: React.FC<Props> = props => {
	const [editingCityId, setEditingCityId] = React.useState(null);
	const { loading, error, data } = useQuery(allCitiesQuery);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const { addDialogOpen, setAddDialogOpen, classes } = props;
	const handleOpenAddCity = () => setAddDialogOpen(true);
	const handleCloseAddCity = () => setAddDialogOpen(false);
	const handleEditCity = id => () => setEditingCityId(id);
	const handleCloseEditCity = () => setEditingCityId(null);

	return (
		<Paper className={classes.root}>
			<Toolbar>
				<Button onClick={handleOpenAddCity} variant="contained" color="primary">
					Adicionar
				</Button>
			</Toolbar>
			<AddDialog open={addDialogOpen} onClose={handleCloseAddCity} />
			<List>
				{data.cities.map(({ id, name }) => (
					<ListItem key={id} role={undefined}>
						{editingCityId === id ? (
							<EditListItem
								handleCloseEdit={handleCloseEditCity}
								city={{ id, name }}
							/>
						) : (
							<React.Fragment>
								<ListItemText primary={name} />
								<ListItemSecondaryAction>
									<DeleteItemButton city={{ id, name }} />
									<IconButton
										onClick={handleEditCity(id)}
										aria-label="Editar cidade"
									>
										<EditIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</React.Fragment>
						)}
					</ListItem>
				))}
			</List>
		</Paper>
	);
};

export default compose(
	withState('addDialogOpen', 'setAddDialogOpen', false),
	withStyles(styles),
)(CityList);
