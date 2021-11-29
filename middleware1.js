"use strict";
const bodyParser = require('body-parser');
const routes = require('./src/routes/metierRoutes');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;

const middleware = (app) => {

    this.useBodyParser = () => {
        //return json to client
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        return this;
    };

    this.useCors = () => {
        //cors
        app.use(cors({ origin: 'http://localhost:4000' }));
        return this;
    }

    this.useLogger = () => {
        //log info about request
        app.route('*').get((req, res, next) => {
            console.log(`express:req from ${req.originalUrl}`);
            console.log(`express:req type ${req.method}`);
            next();
        });
        return this;
    }

    this.useRouteApi = () => {
        //Routes api
        routes(app);
        return this;
    }

    this.useStaticFiles = () => {
        //serve static files (this folder)
        app.use(express.static(path.join(__dirname, 'wwwroot')));

        //show in browser server is running
        // app.get('/', (req, res) => res.send(`<h1>1-server node is running in port ${PORT}</h1>`));
        app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'wwwroot', 'index.html')));
        return this;
    }
};

module.exports = middleware;
