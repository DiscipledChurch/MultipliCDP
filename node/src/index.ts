import express = require('express');
import morgan = require('morgan');
import path = require('path');
import bodyParser = require('body-parser');

import Config from './config';

class Server {
    public app: express.Application;
    public config: Config;

    /**
     * cstor
     * 
     * @class Server
     * @constructor
     */
    constructor() {
        this.app = express();
        this.config = new Config();
    }
}
