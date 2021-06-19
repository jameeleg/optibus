import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 650,
  },
});

export const SmartTable = (props) => {
	const classes = useStyles();
	
	const renderHeadCell = (h, idx) =>{
		if(!props.viewOnly && props.editMode && props.editColumn === idx){
			return <TableCell className='edit-column'> Select </TableCell>	
		}
		return <TableCell> {h} </TableCell>
	}

	const renderHeaderRow = () => {
		return <TableRow>
		{props.headers.map(renderHeadCell)}
		</TableRow>
	}

	const renderRow = (row) => {
		const rowId = props.getIdForRow(row);
		const isRowSelectable = props.isRowSelectable(row);
		const isRowSelected = props.selectedRow && rowId === props.getIdForRow(props.selectedRow)

		let cls = '';


		const onClick = e => {
			e.stopPropagation();
			props.onSelect(row);
		}

		const rowProps = {
			onClick: isRowSelectable && !props.viewOnly? onClick: e => e.stopPropagation(),
			className: clsx({'row-selectable': isRowSelectable && !props.viewOnly }, {'selected-row': isRowSelected && !props.viewOnly}),
		}

		return <TableRow {...rowProps}>
		{
			props.headers.map((c, idx) => {
				if(!props.viewOnly && props.editMode && props.editColumn === idx && isRowSelectable){
					return <TableCell className="edit-column"><Radio className="btn-select-item" checked={false}/></TableCell>
				}
				return <TableCell> {props.renderRow(row, c)} </TableCell>
			})
		}
		</TableRow>
	}

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
			  <Table stickyHeader aria-label="sticky table">
			    <TableHead>
			     {renderHeaderRow()}
			    </TableHead>
			    <TableBody>
			      {props.data.map(renderRow)}
			    </TableBody>
			  </Table>
		</TableContainer>
	</Paper>
	);
}


