const express = require('express');
const cors = require('cors');

const { tweets, likes } = require('./app/routes/routes');
const connection = require('./config/mongoConnection');

class App {

    constructor() {
        this._server = express();
        this._http = require('http').Server(this._server);
        this._io = require('socket.io')(this._http);
    }

    _middlewares(){
        this._server.use(cors());

        this._server.use( (req, res, next) => {

            req.io = this._io;

            return next();
        })

        this._server.use(express.json());
    }

    _routes() {
        this._server.use('/tweets', tweets);
        this._server.use('/likes', likes);
    }

    _connection () {
        connection();
    }

    getApp() {
        this._middlewares();
        this._connection();
        this._routes();

        return this._http;
    }
}

module.exports = new App().getApp();