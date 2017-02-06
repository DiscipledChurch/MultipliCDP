import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import Config from './config';
import { OrganizationsController } from './controllers';

const app: express.Application = express();
let config = new Config();

// use body parser to grab information from POST requests
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// configure to handle CORS requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

// turn on logging
if (app.get('env') === 'development') {
    app.use(morgan('dev'));
}

// configure public assets folder
app.use(express.static(path.join(__dirname, '/../dist')));

/*
// add authentication routes
var authRoutes = require('./app/routes/authentication')(app, express);
app.use('/', authRoutes);

// add api routes
var apiRoutes = require('./app/routes/api/index')(app, express);
app.use('/api', apiRoutes); 
*/

app.use('/organizations', OrganizationsController);

// route for index.html
app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname, '/../dist/index.html'));
    res.sendStatus(200);
});



// connect to database
//mongoose.Promise = global.Promise;
//mongoose.connect(config[config.repo]);

// start server
var server = app.listen(config.port, () => {
    if (app.get('env') === 'development')
        console.log('Web server listening on port %s', config.port);
});

// export for testing
module.exports = server;