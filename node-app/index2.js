
/* Server specific version of Zone.js */
require('zone.js/dist/zone-node');
mongoose = require('mongoose');
express = require('express');
const middleware = require('./middleware');

const mongoConnection = require('./src/models/dbContext');

const bodyParser = require('body-parser');
const route = require('./src/routes/route');
const path = require('path');
const cors = require('cors');

const http = require('http');
const socket = require('socket.io');

const PORT = process.env.PORT || 3000;
//
const app = express();

const server = http.createServer(app);
let io = socket(server);

//
mongoConnection();

// io = io(server);
app.use(function (req, res, next) {
  req.io = io;
  next();
});

const join = require('path').join;
// const readFileSync = require('fs').readFileSync;

// Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

// Express server
// const app = express();

//MiddleWare
// app.route('*').get((req, res, next) => {
//   console.log(`ssr:req from ${req.originalUrl}`);
//   console.log(`ssr:req type ${req.method}`);
//   next();
// });

// const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'wwwroot'); // = `${__dirname}/dist/browser`

// Our index.html we'll use as our template
// const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

/* The server bundle is loaded here, it's why you don't want a changing hash in it */
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./wwwroot/angular-server/main`);

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// route(app);
// app.use(cors());

const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;

/* Configure Angular Express engine */
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));
route(app);
// Server static files from /browser
// app.use('/angular-client', express.static(join(__dirname, 'wwwroot')));
//     app.use('/angular-server', express.static(join(__dirname, 'wwwroot')));
app.get('*.*', express.static(join(DIST_FOLDER, 'angular-client')));

// All regular routes use the Universal engine
app.get('*', (req, res, next) => {
  
  console.time(`GET: ${req.originalUrl}`);
  // app.get('/', (req, res) => res.sendFile('./wwwroot/angular-client/index.html'));
  // res.render(('wwwroot/angular-client/index.html'), { req, res });
  res.render(join(DIST_FOLDER, 'angular-client', 'index.html'), { req, res });
  
  console.timeEnd(`GET: ${req.originalUrl}`);
  // next();
});

// middleware(app);

/* setup socket.io */
io.of('/comments').on('connection', (socket) => {
  console.log('>> Socket-Comment');
});

io.of('/noteRecette').on('connection', (socket) => {
  console.log('>> Socket-noteRecette');
});



// Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node server listening on http://localhost:${PORT}`);
// });

server.listen(PORT, () => console.log(`-runnig in port ${PORT}`));
