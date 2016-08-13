var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/malachiye', function(req, res, next) {
	  res.render('admin', { title: 'Express' });
});

router.get('/baiye/:id', function(req, res, next) {
	  console.log(req.params.id);
	  res.render('template/baiye/item-detail', { title: 'Express' });
});

module.exports = router;
