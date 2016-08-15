var express = require('express');
var router = express.Router();

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

router.get('/baiye/:id', function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		console.log(body);
		res.render('template/baiye/item-detail', {
			title : 'Express',
			item : body
		});
		res.status(200).end();
	});
});

module.exports = router;
