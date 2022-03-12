const controller = require('../controllers/commentControllers');
const handleUlpoad = require('../../storageImage');

const routeName = '/api/comments/';

module.exports = routesComment = (app) => {
    app.route(routeName)
        // .get(controller.getList)
        .post(controller.post);

    app.route(routeName + 'count/:id')
        .get(controller.getCountComment);

    app.route(routeName + ':idComment/:idRecette')
        .delete(controller.delete$);

    app.route(routeName + ':id')
        .get(controller.getList)
        .put(controller.put)
        // .delete(controller.delete$);
};
