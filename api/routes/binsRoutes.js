const controller = require('../controllers/binsController');

const routeName = '/api/bins/';

module.exports =  routesCategorie = (app) => {

    app.route(routeName)
        .get(controller.getList)
        .post(controller.post);

    app.route(routeName + ':id')
        .get(controller.get)
        .put(controller.put)
        .delete(controller.delete$);
};
