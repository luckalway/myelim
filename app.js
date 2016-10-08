var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var jwt = require('express-jwt');
var secret = require('./config/secret.js');
var fs = require("fs");
var jimp = require("jimp");

global.ROOT_PATH = __dirname;
global.nano = require('nano')(require('./env').couchdb.url);

global.db = nano.db.use(require('./env').couchdb.db);
global.upload = require('./custom_node_modules/jquery-file-upload-middleware');
var conf = require('./config');
global.conf = conf;

var routes = require('./routes/index');
var baiyeRoutes = require('./routes/baiye.js');
var anliRoutes = require('./routes/api/sold-case.js');
var peijianRoutes = require('./routes/api/peijian.js');
var baiyeAdminRoutes = require('./routes/api/baiye.js');
var loginRoutes = require('./routes/admin/login.js');

var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'temp')));

app.use('/', routes);
app.use('/', baiyeRoutes);
app.use('/api/', anliRoutes);
app.use('/api/', peijianRoutes);
app.use('/api/', baiyeAdminRoutes);
app.use('/admin/', loginRoutes)

// if can not find a available image
app.get(/\/data\/.*\.jpg$/, function(req, res, next) {
	var matchedArray =/.+\.jpg_([a-z]+)\.jpg$/.exec(req.url);  
	var notFound = true;
	if(matchedArray){
		var imageType = matchedArray[1];
		var opts = conf.resizeVersion.default[imageType];
		if(opts){
			notFound = false; 
            jimp.read(conf.image.getOriginImageLocalPath(req.url), function (err, image) {
                if (err) 
                	throw err;
                
                var width = opts.width < image.bitmap.width ? opts.width : image.bitmap.width;
                image.resize(width, opts.height || jimp.AUTO).write(conf.image.getImageLocalPath(req.url), function(){
                	res.writeHead(200, {'Content-Type': 'image/jpg' });
                	res.end(fs.readFileSync(conf.image.getImageLocalPath(req.url)), 'binary');
                	return;
                });
            });
		}
	}
	
	if(notFound){
		var img404 = fs.readFileSync(ROOT_PATH+'/public/images/404/default.jpg');
		res.writeHead(200, {'Content-Type': 'image/jpg' });
		res.end(img404, 'binary');		
	}
});

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	console.log(err.stack);
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

/***
app.use(jwt({
	secret : secret.secretToken
}));
**/

upload.configure({
    //imageVersions: conf.resizeVersion.default
});

module.exports = app;

