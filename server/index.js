// community libs
var express = require('express'),
//    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// custom libs
var config = require('./config.js');

// instantiate server
var app = express();

// use body parser to grab information from POST requests
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// configure to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

// turn on logging
if (app.get('env') == 'development') {
//    app.use(morgan('dev'));
}

// configure public assets folder
app.use(express.static(__dirname + './../dist'));

/*
// add authentication routes
var authRoutes = require('./app/routes/authentication')(app, express);
app.use('/', authRoutes);

// add api routes
var apiRoutes = require('./app/routes/api/index')(app, express);
app.use('/api', apiRoutes); 
*/
// route for index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + './../dist/index.html'));
});

// connect to database
mongoose.Promise = global.Promise;
//mongoose.connect(config[config.repo]);

// start server
app.listen(config.port);

