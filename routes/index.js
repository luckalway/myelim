var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
	res.render('index', {
		title : 'Express'
	});
});

router.get('/malachiye', function(req, res, next) {
	res.render('admin', {
		title : 'Express'
	});
});



router.get('/upload',function(req, res, next){
	res.render('basic-plus', {
		
	});
})

module.exports = router;
