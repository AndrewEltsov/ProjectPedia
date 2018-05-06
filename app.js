//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
var errorHandler = require('errorhandler');
var config = require('./config/index');
var log = require('./libs/log')(module);
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('./libs/mongoose');
var bodyParser = require('body-parser');
var HttpError = require('./error/index').HttpError;

var app = express();
app.set('port', config.get("port"));

app.engine('ejs', require('ejs-locals')); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if(app.get('env'=='development')){
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.use(express.json());
app.use(bodyParser());
app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get("session:key"),
    cookie: config.get("session:cookie"),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

require('./routes/index')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    if (typeof err == 'number') { 
      err = new HttpError(err); 
    }
  
    if (err instanceof HttpError) {
      res.sendHttpError(err);
    } else {
        if (process.env.NODE_ENV === 'development') {
            app.use(errorhandler());
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

http.createServer(app).listen(app.get('port'), function(){
    log.info('Express server listening on port ' + config.get("port"));
});