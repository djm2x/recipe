const metiers = require('../controllers/metierControllers');
var multer  = require('multer')
// var upload = multer({ dest: '../../uploads/' })
const upload = require('../../storageImage');
const routeName = '/api/metier/';

const routes = (app) => {
    app.route(routeName)
        .get(metiers.getList)
        // .post(upload.array('file', 1), metiers.post);

    app.route(routeName + ':id')
        .get(metiers.get)
        .put(metiers.put)
        .delete(metiers.delete$);
};

module.exports = routes;
