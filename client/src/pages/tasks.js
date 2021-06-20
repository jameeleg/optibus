import React from 'react';
import {SmartTable} from '../components/table';

import {actionCellRenderer} from '../components/action_cell_renderer';


const taskColumns = ['Driver', 'Task Id', 'Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'];

export const Tasks = (props) => {
	const renderTaskCell = (task, column) => {
		switch(column){
			case 'Driver':
				return actionCellRenderer(
					props.taskToDriver,
					task,
					task.lineId,
					d => d? d.name : '',
					getDriverById,
					props.viewOnly,
					props.driverSelected,
					'Driver',
					(driver) => {
						const removeParams = {
							driver,
							task
						}
						props.removeAssignment(removeParams)
					}
				)
			case 'Task Id':
				return task.lineDisplayId;
			case 'Day1':
				return task.tasks[0].type;
			case 'Day2':
				return task.tasks[1].type;
			case 'Day3':
				return task.tasks[2].type;
			case 'Day4':
				return task.tasks[3].type;
			case 'Day5':
				return task.tasks[4].type;
			case 'Day6':
				return task.tasks[5].type;
			case 'Day7':
				return task.tasks[6].type;

			default: 
				return '';
		}
	}

	const isTaskSelectable = (task) => props.taskToDriver[task.lineId] === undefined
	const getDriverById = (driverId) => {
		const ds = props.drivers.filter(d => d.id === driverId);
		if(ds.length === 0){
			return undefined;
		}
		return ds[0];
	}


	return 	<SmartTable
				 data={props.tasks}
				 onSelect={props.onSelect}
				 selectedRow={props.selectedRow}
				 getIdForRow={(r) => r.lineId}
				 headers={taskColumns}
				 renderRow={renderTaskCell}
				 className="tasks-table"
				 isRowSelectable={isTaskSelectable}
				 editMode={props.driverSelected}
				 editColumn={0}
				 viewOnly={props.viewOnly}
		  	/>

}