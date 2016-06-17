var express = require('express');
var jwt = require('jwt-simple');
var secret = require('./../../config/secret.js');

var router = express.Router();

router.post('/login', function(req, res, next) {
	var username = req.body.username || '';
	var password = req.body.password || '';

	if (username == 'luckalway' && password == '4753295') {
		var token = jwt.encode({
			id : username
		}, secret.secretToken);

		return res.json({
			token : token
		});
	}
	return res.send(401);
});

module.exports = router;
