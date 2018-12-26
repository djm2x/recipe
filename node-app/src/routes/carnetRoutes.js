const controller = require('../controllers/carnetControllers');

const routeName = '/api/carnets/';

module.exports = carnetRoutes = (app) => {
    app.route(routeName)
        .post(controller.post);

    app.route(routeName + ':idUser/:idRecette')
        .get(controller.getState)
        .delete(controller.delete$);

    app.route(routeName + ':idUser/:startIndex/:pageSize')
        .get(controller.getList);
};
