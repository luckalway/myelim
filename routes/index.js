var express = require('express');
var router = express.Router();

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

router.get('/malachiye/baiye', function(req, res, next) {
	db.view("sold_cases", "baiyes", function(err, body) {
		if (!err) {
			var baiyes = [];
			var limit = req.query.limit || 100;
			body.rows.forEach(function(doc) {
				if (baiyes.length < limit) {
					doc.value.unitDisplay = VALUE_MAP[doc.value.unit];
					doc.value.subTypeDisplay = VALUE_MAP[doc.value.subType];
					baiyes.push(doc.value);
				}
			});
			res.render('admin/baiye/baiye-list', {
				baiyes : baiyes
			});
		}
	});
});

router.get('/baiye/:id', function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		res.render('baiye/item-detail', {
			title : 'Express',
			item : body
		});
		res.status(200).end();
	});
});

module.exports = router;
