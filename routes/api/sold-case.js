var express = require('express');
var multer = require('multer');
var path = require('path');

var nano = require('nano')('http://114.215.185.21:5984');
var db = nano.db.use('vmeifang');

var router = express.Router();
var storage = multer.diskStorage({
	destination : path.join(global.ROOT_PATH, '/public/data/sold-show/images/'),
	filename : function(req, file, cb) {
		var format = require('date-format');
		format.asString(new Date());
		cb(null, format("yyyyMMddhhmmssSSS") + ".jpg");
	}
})

var upload = multer({
	storage : storage
}).any();

router.get('/sold-cases', function(req, res, next) {
	db.view("sold_cases", "sold_cases", function(err, body) {
		if (!err) {
			var docs = [];
			body.rows.forEach(function(doc) {
				docs.push(doc.value);
			});
			res.send(docs);
		}
	});
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
	upload(req, res, function(err) {
		var soldCase = {
			id : req.body.id,
			area : req.body.area,
			garden : req.body.garden,
			images : [],
			preview : null,
			type : "anli"
		};

		for (var i = 0; i < req.files.length; i++) {
			var file = req.files[i];
			var imageURL = path.join("/data/sold-show/images",file.filename);
			if (file.originalname.indexOf("preivew") == -1) {
				soldCase.images.push(imageURL);
			} else {
				soldCase.preview = imageURL;
			}
		}

		if (!soldCase.preview) {
			soldCase.preview = soldCase.images[0];
		}

		db.insert(soldCase);
	});
	res.status(204).end();
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