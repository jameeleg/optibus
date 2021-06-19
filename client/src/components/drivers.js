import React from 'react';
import {SmartTable} from './table';


import {actionCellRenderer} from './action_cell_renderer';

export const Drivers = (props) => {
	
	const renderDriverCell = (driver, column) => {
		switch(column){
			case 'Name':
				return driver.name;
			case 'Id':
				return driver.id;
			case 'Task id':
				return actionCellRenderer(
					props.driverToTask,
					driver,
					driver.id,
					t => t? t.lineDisplayId : '',
					getTaskByTid,
					props.viewOnly,
					props.assignmentSelected,
					'Task',
					(task) => {
						const removeParams = {
							driver,
							task
						}
						props.removeAssignment(removeParams)
					}
				)
			default:
				return '';
		}	
	}
	const getTaskByTid = (taskId) => {
		const ts = props.tasks.filter(t => t.lineId === taskId);
		if(ts.length === 0){
			return undefined;
		}
		return ts[0];
	}

	const isDriverSelectable = (driver) => props.driverToTask[driver.id] === undefined

	return 	<SmartTable 
				data={props.drivers}
				onSelect={props.onSelect}
				selectedRow={props.selectedRow}
				getIdForRow={(r) => r.id}
				headers={['Name', 'Id', 'Task id']} 
				renderRow={renderDriverCell}
				className="drivers-table"
				isRowSelectable={isDriverSelectable}
				editMode={props.assignmentSelected}
				editColumn={2}
				viewOnly={props.viewOnly}
			/>

}
