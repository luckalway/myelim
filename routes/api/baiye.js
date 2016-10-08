var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require("fs");
var url = require('url');
var BASE_UPLOAD_DIR = global.conf.directors.upload_image + '/baiye/';
var BASE_UPLOAD_URL = global.conf.directors.upload_image_url + '/baiye/';
var rmdir = require('rmdir');

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
		if(!filenames){
			res.send({'files': []});
			return;
		}
			
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
		      'thumbnailUrl': BASE_UPLOAD_URL + req.params.id + '/small/' + filename
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
	fs.readdir(path.join(BASE_UPLOAD_DIR, req.params.id), function (err, filenames) {
		filenames = filenames||[];
		filenames.forEach(function(filename){
			if(filename.startsWith(req.params.name)){
				fs.unlinkSync(path.join(BASE_UPLOAD_DIR, req.params.id, filename));
			}
		});
	});
	res.status(200).end();
});

router.post("/baiyes", function(req, res, next) {
	var baiye = {
		productId : req.body.productId,
		price : req.body.price,
		unit : req.body.unit,
		subType : req.body.subType,
		type : "baiye"
	}

	db.insert(baiye);
	res.redirect('/malachiye/baiyes');
});

router.get("/baiyes/:id", function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		var folderpath = path.join(BASE_UPLOAD_DIR, body.productId);	
		fs.readdir(folderpath, function (err, filenames) {
			var images = [];
			filenames = filenames || [];
			filenames.forEach(function (filename) {
				  if (!/.+\.jpg_([a-z]+)\.jpg$/.test(filename)) {
				    images.push(BASE_UPLOAD_URL + req.params.id + '/' + filename);
				  }
			});
			body.images = images;
			body.preview = BASE_UPLOAD_URL + req.params.id + '/preview.jpg';
			res.send(body);
			res.status(200).end();
		});
	});
});

router.delete("/baiyes/:id", function(req, res, next) {
	db.get(req.params.id, {
		revs_info : true
	}, function(err, body) {
		if (!err) {
			rmdir(path.join(BASE_UPLOAD_DIR, body.productId));
			db.destroy(body._id, body._rev);
			res.status(200).end();
		}
	});
});

module.exports = router;