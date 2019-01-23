import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { SortDirection } from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Escola' },
  { id: 'city', numeric: false, disablePadding: false, label: 'Cidade' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Telefone' },
];

interface Props {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: SortDirection;
  orderBy: string;
  rowCount: number;
}

class EnhancedTableHead extends React.Component<Props> {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Ordenar"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order ? order : 'asc'}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default EnhancedTableHead;
