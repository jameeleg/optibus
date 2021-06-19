var express = require('express');
const services = require('./../services/index');
const {dbService} = services

var router = express.Router();



/* GET Tasks listing. */
router.get('/', function(req, res, next) {
  	try {
		res.send(dbService.getTasks());
  	}
    catch (e){
        // (TODO): handle error code in more granularity
        res.status(409).send(e.toString()); 
    }
});



module.exports = router;
