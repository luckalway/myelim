var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require("fs");
const
url = require('url');

var router = express.Router();

var UNIT_MAP = {
	permeter : "元/米"
};

router.get('/peijians/folder', function(req, res, next) {
	var peijians = fs.readdirSync(path.join(global.ROOT_PATH, '/public/data/peijian/guidao'));
	res.send(peijians);
});

router.get("/peijians", function(req, res, next) {
	db.view("sold_cases", "peijians", function(err, body) {
		if (!err) {
			var docs = [];
			var limit = req.query.limit || 100;
			body.rows.forEach(function(doc) {
				if (docs.length < limit) {
					doc.value.unit = UNIT_MAP[doc.value.unit];
					docs.push(doc.value);
				}
			});
			res.send(docs);
		}
	});
});

router.post("/peijians", function(req, res, next) {
	var folderPath = path.join(global.ROOT_PATH, '/public/data/peijian/', req.body.subType, req.body.productId);
	var allImages = fs.readdirSync(folderPath);
	var images = [];
	var baseUrl = url.resolve('/data/peijian/' + req.body.subType + "/", req.body.productId);
	allImages.forEach(function(image) {
		if (/^[0-9]+\.jpg$/.exec(image)) {
			images.push(baseUrl + "/" + image);
		}
	});

	var peijian = {
		productId : req.body.productId,
		price : req.body.price,
		unit : req.body.unit,
		images : images,
		preview : baseUrl + "/preview.jpg",
		subType : req.body.subType,
		type : "peijian"
	}

	db.insert(peijian);
	res.redirect('/malachiye#/peijian');
});

router.delete("/peijians/:id", function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		console.log(body);
		if (!err) {
			db.destroy(body._id, body._rev, function(err, body) {
				if (!err)
					console.log(body);
				res.status(200).end();
			});
		}
	});
});

module.exports = router;