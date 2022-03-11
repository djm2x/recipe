require('zone.js/dist/zone-node');
// require('reflect-metadata');
mongoose = require('mongoose');
// express = require('express');
import * as express from 'express'
const http = require('http');
const middleware = require('./src/middleware/middleware');
const insertCategorie = require('./src/utils/categorieList');
const mongoConnection = require('./src/models/dbContext');
const seedData = require('./src/utils/seedData');
mongoConnection();


const PORT = process.env.PORT || 3000;
//
const app = express();
//
server = http.createServer(app);
//
// seedData.seedUsers();
// seedData.seedRecettes();
// seedData.seedAdminUser();
// insertCategorie();
middleware(app);

server.listen(PORT, () => console.log(`-runnig in port ${PORT}`));
// heroku login
// git init
// heroku git:remote -a recette-cuisine
// git add .
// git commit -am 'better'
// git push heroku master
// https://ouvrier.herokuapp.com/
