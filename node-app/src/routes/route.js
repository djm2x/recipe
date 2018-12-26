const userRoute = require('./userRoutes');
// const routeM = require('./metierRoutes');
const routesRecette = require('./recetteRoutes');
const routesCatalogue = require('./categorieRoutes');
const routesComment = require('./commentRoutes');
const noteRecetteRoutes = require('./noteRecetteRoutes');
const carnetRoutes = require('./carnetRoutes');
const binsRoutes = require('./binsRoutes');

module.exports = route = (app) => {
    userRoute(app);
    // routeM(app);
    routesRecette(app);
    routesCatalogue(app);
    routesComment(app);
    noteRecetteRoutes(app);
    carnetRoutes(app);
    binsRoutes(app);
};
