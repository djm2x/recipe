"use strict";
const bodyParser = require('body-parser');
const route = require('../routes/route');
const path = require('path');
const cors = require('cors');

const middleware = (app) => {
    //return json to client
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //cors
    app.use(cors());

    //log info about request
    app.route('*').get((req, res, next) => {
        console.log(`express:req from ${req.originalUrl}`);
        console.log(`express:req type ${req.method}`);
        next();
    });
    // socket import
    require('./io');

    // router 
    route(app);

    // static files
    app.use(express.static(path.join(process.cwd(), 'wwwroot')));
    // app.use(express.static(path.join(__dirname, 'wwwroot/users')));
    // app.use(express.static(path.join(__dirname, 'wwwroot/recettes')));
    // server side rendering 'angular universal'
    require('./ssr');
};

module.exports = middleware;
