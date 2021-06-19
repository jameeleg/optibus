const services = require('./../services/index');
const {dbService} = services


const updateDriverAndTaskWithAction = (did, tid, action) => {
	const prevTaskId = dbService.getTaskByDriver(did);
	const prevDriverId = dbService.getDriverByTask(tid);

	if(action === 'ASSIGN'){
		dbService.setTaskByDriver(did, tid);
		dbService.setDriverByTask(tid, did);
	}
	else  { // it's 'REMOVE'
		prevDriverId && dbService.setTaskByDriver(prevDriverId, undefined);
		prevTaskId && dbService.setDriverByTask(prevTaskId, undefined);
	}
}

const updateDriverAndTask = (driverId, taskId, action) => {
	const drivers = dbService.getDrivers().filter(d => d.id === driverId);
	if (drivers.length !== 1){
		throw new Error('Driver not found');
	}

	const tasks = dbService.getTasks().filter(t => t.lineId === taskId);
	if (tasks.length !== 1){
		throw new Error('Task not found');
	}
	updateDriverAndTaskWithAction(driverId, taskId, action);
}

module.exports = {updateDriverAndTask};