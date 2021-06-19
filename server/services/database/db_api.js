const db = require('./db');

const getDrivers = () => {
	return db.driversTable;
}

const getTasks = () => {
	return db.tasksTable;
}

const getTaskToDriver = () => {
	return db.taskToDriverTable;
}

const getDriverToTask = () => {
	return db.driversToTaskTable;
}
 
const setDriverByTask = (tid, did) => {
	db.taskToDriverTable[tid] = did;
}

const getDriverByTask = (tid) => {
	return db.taskToDriverTable[tid]
}

const setTaskByDriver = (did, tid) => {
	db.driversToTaskTable[did] = tid;
}

const getTaskByDriver = (did) => {
	return db.driversToTaskTable[did];
}

const databaseApi = {
	getDrivers,
	getTasks,
	getTaskToDriver,
	getDriverToTask,
	setDriverByTask,
	getDriverByTask,
	setTaskByDriver,
	getTaskByDriver,
}
module.exports = databaseApi;
