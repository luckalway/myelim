var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require("fs");
const
url = require('url');
var BASE_UPLOAD_DIR = global.conf.directors.upload_image + '/baiye/';
var BASE_UPLOAD_URL = global.conf.directors.upload_image_url + '/baiye/';

var router = express.Router();

var VALUE_MAP = {
	squaremeter : "元/平方米",
	baiye : "百叶帘",
	juan : "卷帘",
	rousha : "柔纱帘"
};

router.get('/baiyes/folder', function(req, res, next) {
	var baiyes = fs.readdirSync(path.join(global.ROOT_PATH, '/public/data/baiye'));
	res.send(baiyes);
});

router.get("/baiyes", function(req, res, next) {
	db.view("sold_cases", "baiyes", function(err, body) {
		if (!err) {
			var docs = [];
			var limit = req.query.limit || 100;
			body.rows.forEach(function(doc) {
				if (docs.length < limit) {
					doc.value.unitDisplay = VALUE_MAP[doc.value.unit];
					doc.value.subTypeDisplay = VALUE_MAP[doc.value.subType];
					docs.push(doc.value);
				}
			});
			res.send(docs);
		}
	});
});

router.get('/baiyes/:id/images', function (req, res, next) {
	var folderpath = path.join(BASE_UPLOAD_DIR, req.params.id);	
	fs.readdir(folderpath, function (err, filenames) {
		var files = [];
		filenames.forEach(function (filename) {
		  var stats = fs.lstatSync(path.join(folderpath, filename))
		  if (stats.isFile()) {
		    files.push({
		      'name': filename,
		      'originalName': filename,
		      'size': stats.size,
		      'type': 'image/jpeg',
		      'deleteType': 'DELETE',
		      'url': BASE_UPLOAD_URL + req.params.id + '/' + filename,
		      'deleteUrl': '/api/baiyes/' + req.params.id + '/images/' + filename,
		      'thumbnailUrl': BASE_UPLOAD_URL + req.params.id + '/thumbnail/' + filename
		    });
		  }
		});
		res.send({
		  'files': files
		});
	});
});


router.post('/baiyes/:id/images', function (req, res, next) {
    upload.fileHandler({
        uploadDir: function () {
            return path.join(BASE_UPLOAD_DIR, req.params.id); 
        },
        uploadUrl: function () {
            return  BASE_UPLOAD_URL + req.params.id; 
        }
    })(req, res, next);
});

router.delete('/baiyes/:id/images/:name', function (req, res, next) {
	fs.unlinkSync(path.join(BASE_UPLOAD_DIR, req.params.id, req.params.name));
	for(var key in conf.resizeVersion.default){
		fs.unlinkSync(path.join(BASE_UPLOAD_DIR, req.params.id, key, req.params.name));
		console.log(path.join(BASE_UPLOAD_DIR, req.params.id, key, req.params.name));
	}
	res.status(200).end();
});

router.post("/baiyes", function(req, res, next) {
	var folderPath = path.join(BASE_UPLOAD_DIR, req.body.productId);
	var allImages = fs.readdirSync(folderPath);
	var images = [];
	var baseUrl = url.resolve(BASE_UPLOAD_URL, req.body.productId);
	allImages.forEach(function(image) {
		if (/.+\.jpg$/.exec(image)) {
			images.push(baseUrl + "/" + image);
		}
	});

	var baiye = {
		productId : req.body.productId,
		price : req.body.price,
		unit : req.body.unit,
		images : images,
		preview : baseUrl + "/preview.jpg",
		subType : req.body.subType,
		type : "baiye"
	}

	db.insert(baiye);
	res.redirect('/malachiye#/baiye');
});

router.get("/baiyes/:id", function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		res.send(body);
		res.status(200).end();
	});
});

router.delete("/baiyes/:id", function(req, res, next) {
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