var express = require('express');
var router = express.Router();

var nano = require('nano')('http://114.215.185.21:5984');
var db = nano.db.use('vmeifang');

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


module.exports = router;
