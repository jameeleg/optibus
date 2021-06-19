import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {Drivers} from './drivers';
import {Tasks} from './tasks'

export const Assignment = (props) => {
	const assignTaskToDriver = async (driverId, taskId) => {
	    fetch(
	    	'http://localhost:3000/assignment/assign',
	    	{
	    		method: 'post',
    		    headers: {
			        'Content-Type': 'application/json'
			    },
	    		body: JSON.stringify({driverId, taskId})
    		}
		).then(res => res.json())
    .then(data => {
    		console.log('Assign successeeded');
	    	props.setAlert({open: true, msg: 'Assignment succeeded!', severity: 'success'});
    		props.setDriverToTask(data.driverToTask);
    		props.setTaskToDriver(data.taskToDriver);
  	})
    	.catch(e => props.setAlert({open: true, msg: 'Failed to set assignment!', severity: 'error'}));
		}

  	const removeAssignmentForTaskAndDriver = async (driverId, taskId) => {
	    fetch(
	    	'http://localhost:3000/assignment/remove',
	    	{
	    		method: 'post',
    		    headers: {
			        'Content-Type': 'application/json'
			    },
	    		body: JSON.stringify({driverId, taskId})
    		}
		)
	    .then(res => res.json())
	    .then(data => {
	    	props.setAlert({open: true, msg: 'Cancelling assignment succeeded!', severity: 'success'});
    		props.setDriverToTask(data.driverToTask);
    		props.setTaskToDriver(data.taskToDriver);
    	})
    	.catch(e => props.setAlert({open: true, msg: 'Failed to cancel assignment!', severity: 'error'}))
  	}

	const onDriverSelected = driver => {
		if(props.selectedTask){
			assignTaskToDriver(driver.id, props.selectedTask.lineId);
			props.onFullMatch();
		}
		else {
			props.onSelectDriver(driver);
		}
	}

	const onTaskSelected = task => {
		if(props.selectedDriver){
			assignTaskToDriver(props.selectedDriver.id, task.lineId);
			props.onFullMatch();
		}
		else {
			props.onSelectTask(task);
		}
	}

	const removeAssignment = (removeParams) => {
		const {driver, task} = removeParams;
		removeAssignmentForTaskAndDriver(driver.id, task.lineId);
		props.onFullMatch();

	}

	return <div className="assignment">
		<div className="drivers-section">
			<Typography variant="h4" component="h2">
			  Drivers
			</Typography>
			<Drivers 
				drivers={props.drivers}
				tasks={props.tasks}
				driverToTask={props.driverToTask}
				taskToDriver={props.taskToDriver}
				onSelect={onDriverSelected}
				selectedRow={props.selectedDriver}
				assignmentSelected={!!props.selectedTask}
				removeAssignment={removeAssignment}
			/>
		</div>
		<div className="tasks-section">
			<Typography variant="h4" component="h2">
			  Tasks
			</Typography>
			<Tasks
				tasks={props.tasks}
				drivers={props.drivers}
				taskToDriver={props.taskToDriver}
				driverToTask={props.driverToTask}
				onSelect={onTaskSelected}
				selectedRow={props.selectedTask}
				driverSelected={!!props.selectedDriver}
				removeAssignment={removeAssignment}
			/>
		</div>
	</div>
}
