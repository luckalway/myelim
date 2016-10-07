var express = require('express');
var router = express.Router();
var path = require('path');

var VALUE_MAP = {
		squaremeter : "元/平方米",
		baiye : "百叶帘",
		juan : "卷帘",
		rousha : "柔纱帘"
};

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
