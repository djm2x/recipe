const join = require('path').join;
const readFileSync = require('fs').readFileSync;

// utile declaration
const PUBLIC_FOLDER = join(process.cwd(), 'wwwroot');
const mainJsInServerFolder = join(PUBLIC_FOLDER, 'angular-server', 'main');
const clientFolder = join(PUBLIC_FOLDER, 'angular-client');
const htmlInClientFolder = join(clientFolder, 'index.html');

/* The server bundle is loaded here, it's why you don't want a changing hash in it */
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(mainJsInServerFolder);
const { renderModuleFactory } = require(`@angular/platform-server`);
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const enableProdMode  = require('@angular/core').enableProdMode;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Our index.html we'll use as our template
const templateHTML = readFileSync(htmlInClientFolder).toString();


methode = (_, options, callback) => {
  const opt = {
    document: templateHTML,
    url: options.req.url,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }

  renderModuleFactory(AppServerModuleNgFactory, opt)
    .then(html => callback(null, html));
}

// create our engine
app.engine('html', methode);

app.set('view engine', 'html');
app.set('views', clientFolder);

// Server static files from /browser
app.get('*.*', express.static(clientFolder));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  //with ssr
  res.render(htmlInClientFolder, { req, res });
  //without ssr
  // res.sendFile(htmlInClientFolder, { req, res });
} );
