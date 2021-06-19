var express = require('express');
var router = express.Router();
const services = require('./../services/index');
const {dbService} = services


/* GET users listing. */
router.get('/', function(req, res, next) {
	try {
		res.send(dbService.getDrivers());
	}
    catch (e){
        // (TODO): handle error code in more granularity
        res.status(409).send(e.toString()); 
    }
});

module.exports = router;
