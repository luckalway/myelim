var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require("fs");
const
url = require('url');

var nano = require('nano')('http://114.215.185.21:5984');
var db = nano.db.use('vmeifang');

var router = express.Router();

router.get('/sold-cases', function(req, res, next) {
	db.view("sold_cases", "sold_cases", function(err, body) {
		if (!err) {
			var docs = [];
			var limit = req.query.limit || 100;
			body.rows.forEach(function(doc) {
				if (docs.length < limit) {
					docs.push(doc.value);
				}
			});
			res.send(docs);
		}
	});
});

router.get('/sold-cases/folder', function(req, res, next) {
	var soldCases = fs.readdirSync(path.join(global.ROOT_PATH, '/public/data/sold-show/'));
	res.send(soldCases);
});

router.get('/sold-cases/:id', function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		res.send(body);
		res.status(200).end();
	});
});

router.post('/sold-cases', function(req, res, next) {
	var regexp = new RegExp('[0-9]+\.jpg');
	var folderPath = path.join(global.ROOT_PATH, '/public/data/sold-show/', req.body.imageFolder);
	var allImages = fs.readdirSync(folderPath);
	var images = [];
	var baseUrl = url.resolve('/data/sold-show/', req.body.imageFolder);
	allImages.forEach(function(image) {
		if (/^[0-9]+\.jpg$/.exec(image)) {
			images.push(baseUrl + "/" + image);
		}
	});

	var soldCase = {
		id : req.body.imageFolder,
		area : req.body.area,
		garden : req.body.garden,
		date : req.body.date,
		images : images,
		preview : baseUrl + "/preview.jpg",
		type : "anli"
	};

	db.insert(soldCase);
	res.redirect('/malachiye#/admin');
});

router.delete("/sold-cases/:id", function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
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