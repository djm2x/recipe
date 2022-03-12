const controller = require('../controllers/userControllers');
// middleware for uploading image we put it befor request
const handleUlpoad = require('../../storageImage')
const checkDuplicateEmail = require('../middleware/verifySignUp');
const authJwt = require('../middleware/verifyJwtToken');
const routeName = '/api/users/';

const routesChef = (app) => {
    app.route(routeName)
        .get(controller.getList)
        .post(handleUlpoad('users'),[checkDuplicateEmail], controller.signup);
    // app.post('/api/users/',handleUlpoad('users'), [checkDuplicateEmail], controller.signup);
    app.route(routeName + 'login').post(controller.logIn);
    // app.get(routeName + ':id', controller.get);

    app.route(routeName + ':id')
        .get([authJwt.verifyToken], controller.get)
        .put(handleUlpoad('users'), controller.put)
        .delete(controller.delete$);
};

module.exports = routesChef;
