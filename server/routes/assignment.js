var express = require('express');
const services = require('./../services/index');
const {dbService} = services
const manager = require('./../lib/manager');

var router = express.Router();


/* GET Assignments listing. */
router.get('/', function(req, res, next) {
    const driverToTask = dbService.getDriverToTask();
    const taskToDriver = dbService.getTaskToDriver();
    res.send({driverToTask, taskToDriver});

});


/* listen to assign a task to driver */
router.post('/assign', function(req, res, next) {
    /* This section is only to simulate an error */
    const r = Math.random();
    if ( r <= 0.2){
        res.status(409).send('Bad request');    
        return;
    }
    /* end of error simulation section */

    const {taskId, driverId} = req.body;
    try {
        manager.updateDriverAndTask(driverId, taskId, 'ASSIGN');
        const driverToTask = dbService.getDriverToTask();
        const taskToDriver = dbService.getTaskToDriver();
        res.send({driverToTask, taskToDriver});    
    }
    catch (e){
        // (TODO): handle error code in more granularity
        res.status(409).send(e.toString()); 
    }

});


/* listen to cancel an assignment */
router.post('/remove', function(req, res, next) {
    const {taskId, driverId} = req.body;

    try {
        manager.updateDriverAndTask(driverId, taskId, 'REMOVE');
        const driverToTask = dbService.getDriverToTask();
        const taskToDriver = dbService.getTaskToDriver();
        res.send({driverToTask, taskToDriver});
    }
    catch (e){
        // (TODO): handle error code in more granularity
        res.status(409).send(e.toString()); 
    }
});


module.exports = router;
