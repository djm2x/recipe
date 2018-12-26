"use strict";
const bodyParser = require('body-parser');
const route = require('./src/routes/route');
const path = require('path');
const cors = require('cors');

// const PORT = process.env.PORT || 3000;

const middleware = (app) => {
    //return json to client
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //cors
    app.use(cors());

    // cors 2 
    // headers and content type
    // app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //     next();
    // });

    //log info about request
    // app.route('*').get((req, res, next) => {
    //     console.log(`express:req from ${req.originalUrl}`);
    //     console.log(`express:req type ${req.method}`);
    //     next();
    // });

    //Routes api
    route(app);

    //serve static files (this folder)
    // app.use(express.static(path.join(__dirname, 'wwwroot')));
    // app.use(express.static(path.join(__dirname, 'wwwroot/users')));
    // app.use('/users', express.static(path.join(__dirname, 'wwwroot')));
    // app.use('/angular-client', express.static(path.join(__dirname, 'wwwroot')));
    // app.use('/angular-server', express.static(path.join(__dirname, 'wwwroot')));

    //show in browser server is running
    // app.get('/', (req, res) => res.send(`<h1>1-server node is running in port ${PORT}</h1>`));
    // app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'wwwroot', 'index.html')));
    //show in console
    // app.listen(PORT, () => console.log(`-runnig in port ${PORT}`));
};

module.exports = middleware;
