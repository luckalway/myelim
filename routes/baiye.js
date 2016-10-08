var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");

var BASE_UPLOAD_DIR = global.conf.directors.upload_image + '/baiye/';
var BASE_UPLOAD_URL = global.conf.directors.upload_image_url + '/baiye/';

var VALUE_MAP = {
		squaremeter : "元/平方米",
		baiye : "百叶帘",
		juan : "卷帘",
		rousha : "柔纱帘"
};

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

router.get('/baiyes/:id', function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		var folderpath = path.join(BASE_UPLOAD_DIR, body.productId);
		fs.readdir(folderpath, function (err, filenames) {
			var images = [];
			if(!filenames){
				filenames = [];
				console.warn("Can not found images of item["+req.params.id+"]");
			}
			
			filenames.forEach(function (filename) {
				  var stats = fs.lstatSync(path.join(folderpath, filename))
				  if (stats.isFile()) {
				    images.push(BASE_UPLOAD_URL + req.params.id + '/' + filename);
				  }
			});
			body.images = images;
			body.preview = BASE_UPLOAD_URL + req.params.id + '/preview.jpg';

			res.render('baiye/item-detail', {
				item : rectifyItem(body)
			});
		});
		
	});
});

module.exports = router;
