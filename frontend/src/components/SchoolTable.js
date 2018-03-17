import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

let counter = 0;
function createData(name, city, phone) {
  counter += 1;
  return { id: counter, name, city, phone };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class SchoolTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [
        createData('Escola de I e II Grau Júlio Müller', 'Barra do Bugres', '(65) 3361-9999'),
        createData('Escola Estadual 15 de Outubro', 'Barra do Bugres', '(65) 3361-9999'),
        createData(
          'Escola Estadual de 1º e 2º Graus Júlio Müller',
          'Barra do Bugres',
          '(65) 3361-9999',
        ),
        createData(
          'Escola Estadual de 1º Grau Evangélica Assembléia de Deus',
          'Barra do Bugres',
          '(65) 3361-9999',
        ),
        createData(
          'Escola Estadual de 1º Grau Prof Julieta Xavier Borges',
          'Barra do Bugres',
          '(65) 3361-9999',
        ),
        createData('Escola Estadual João Catarino de Souza', 'Barra do Bugres', '(65) 3361-9999'),
        createData('Escola Estadual João de Campos Borges', 'Barra do Bugres', '(65) 3361-9999'),
        createData('Escola Estadual José Ourives', 'Barra do Bugres', '(65) 3361-9999'),
        createData('Escola Municipal Guiomar Campos Miranda', 'Barra do Bugres', '(65) 3361-9999'),
        createData('Escola Municipal Herculano Borges', 'Barra do Bugres', '(65) 3361-9999'),
        createData('Escola Adventista de 1º Grau Cáceres', 'Cáceres', '(65) 3361-9999'),
        createData('Instituto Educacional de Cáceres', 'Cáceres', '(65) 3361-9999'),
      ].sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
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

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding="none">{n.name}</TableCell>
                    <TableCell>{n.city}</TableCell>
                    <TableCell>{n.phone}</TableCell>
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
                  count={data.length}
                  labelRowsPerPage="Linhas por página:"
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Página Anterior',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Próxima Página',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

SchoolTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SchoolTable);
