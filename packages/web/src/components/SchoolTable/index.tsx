import {
	createStyles,
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
	Theme,
	WithStyles,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { gql } from '@apollo/client';
import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { compose } from 'recompose';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import SchoolAddDialog from './SchoolAddDialog';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(6),
		},
		table: {
			minWidth: 800,
		},
		tableWrapper: {
			overflowX: 'auto',
		},
	});

export interface City {
	name: string;
}

interface School {
	id: string;
	name: string;
	city: City;
	phone: string;
}
interface Props extends WithStyles<typeof styles> {
	data: {
		loading: boolean;
		schools: School[];
	};
}

type SchoolTableOrder = 'asc' | 'desc';

interface State {
	addDialogOpen: boolean;
	order: SchoolTableOrder;
	orderBy: 'name' | 'city' | 'fone';
	selected: string[];
	schools: School[];
	page: number;
	rowsPerPage: number;
}

const SchoolTable: React.FC<Props> = props => {
	const [state, setState] = React.useState<State>({
		addDialogOpen: false,
		order: 'asc',
		orderBy: 'name',
		selected: [],
		schools: [],
		page: 0,
		rowsPerPage: 10,
	});

	const handleOpenAddSchool = () => {
		setState(state => ({ ...state, addDialogOpen: true }));
	};

	const handleCloseAddSchool = () => {
		setState(state => ({ ...state, addDialogOpen: false }));
	};

	const handleRequestSort = (event, property) => {
		const orderBy = property;
		let order: SchoolTableOrder = 'desc';

		if (state.orderBy === property && state.order === 'desc') {
			order = 'asc';
		}

		const schools =
			order === 'desc'
				? state.schools.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
				: state.schools.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

		setState(state => ({ ...state, schools, order, orderBy }));
	};

	const handleSelectAllClick = (event, checked) => {
		if (checked) {
			setState(state => ({ ...state, selected: state.schools.map(n => n.id) }));
			return;
		}
		setState(state => ({ ...state, selected: [] }));
	};

	const handleClick = (event, id) => {
		const { selected } = state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setState(state => ({ ...state, selected: newSelected }));
	};

	const handleChangePage = (event, page) => {
		setState(state => ({ ...state, page }));
	};

	const handleChangeRowsPerPage = event => {
		setState(state => ({ ...state, rowsPerPage: event.target.value }));
	};

	const isSchoolSelected = id => state.selected.indexOf(id) !== -1;

	const { classes } = props;
	const { order, orderBy, selected, rowsPerPage, page } = state;
	if (props.data.loading) return <p>Carregando escolas...</p>;

	const schools = props.data.schools
		.slice()
		.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, schools.length - page * rowsPerPage);

	return (
		<Paper className={classes.root}>
			<EnhancedTableToolbar
				onOpenAddSchool={handleOpenAddSchool}
				numSelected={selected.length}
			/>
			<SchoolAddDialog
				open={state.addDialogOpen}
				onClose={handleCloseAddSchool}
			/>
			<div className={classes.tableWrapper}>
				<Table className={classes.table}>
					<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={schools.length}
					/>
					<TableBody>
						{schools
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(school => {
								const isSelected = isSchoolSelected(school.id);
								return (
									<TableRow
										hover
										onClick={event => handleClick(event, school.id)}
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={school.id}
										selected={isSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox checked={isSelected} />
										</TableCell>
										<TableCell padding="none">{school.name}</TableCell>
										<TableCell>{school.city.name}</TableCell>
										<TableCell>{school.phone}</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 49 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								colSpan={6}
								count={schools.length}
								labelRowsPerPage="Linhas por página:"
								rowsPerPage={rowsPerPage}
								page={page}
								backIconButtonProps={{
									'aria-label': 'Página Anterior',
								}}
								nextIconButtonProps={{
									'aria-label': 'Próxima Página',
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</Paper>
	);
};

export const allSchoolsQuery = gql`
	query allSchoolsQuery {
		schools {
			id
			name
			city {
				name
			}
			phone
		}
	}
`;

export default compose(
	graphql(allSchoolsQuery),
	withStyles(styles),
)(SchoolTable);
