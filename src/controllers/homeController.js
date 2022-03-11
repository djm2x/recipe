
import {Express, Response} from 'express';

/**
 * @param {Express} app
 * @return {Response}
 */

 const routeName = '/api/users/';

const HomeController = (app) => {

    // get
    
    app.route(routeName).get((req, res) => {

        return res.send('');
    });


}

module.exports = HomeController;