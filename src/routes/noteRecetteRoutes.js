const controller = require('../controllers/noteRecetteControllers');

const routeName = '/api/noteRecettes/';

module.exports = noteRecettesRoutes = (app) => {
    app.route(routeName)
        // .get(controller.getList)
        .post(controller.post);

    app.route(routeName + 'isLiked/:idUser/:idRecette')
        .get(controller.isLiked)

    app.route(routeName + ':idUser/:idRecette')
        .delete(controller.delete$);

    app.route(routeName + ':idRecette')
        .get(controller.getNoteRecette)

};
