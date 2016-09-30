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

router.get('/malachiye/baiyes', function(req, res, next) {
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

function rectifyItem(baiyeItem){
	baiyeItem.feedback = baiyeItem.feedback||0;
	baiyeItem.buyerShow = baiyeItem.buyerShow || 0;
	baiyeItem.sold = baiyeItem.sold || 0;
	baiyeItem.case = baiyeItem.case || 0;
	return baiyeItem;
};

router.get('/malachiye/baiyes/add', function(req, res, next) {
	res.render('admin/baiye/baiye-edit', {
	});
});

router.get('/baiye/:id', function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		res.render('baiye/item-detail', {
			item : rectifyItem(body)
		});
	});
});




router.get('/upload',function(req, res, next){
	res.render('basic-plus', {
		
	});
})

module.exports = router;
