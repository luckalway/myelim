var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require("fs");
const
url = require('url');

var nano = global.nano;
var db = global.db;

var router = express.Router();

router.get('/peijians/folder', function(req, res, next) {
	var peijians = fs.readdirSync(path.join(global.ROOT_PATH, '/public/data/peijian/guidao'));
	res.send(peijians);
});

module.exports = router;