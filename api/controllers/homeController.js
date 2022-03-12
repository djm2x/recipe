
import { Express, Response } from 'express';

// @ts-check
// @return {Response}

/** 
 * A simple string example.
 * @type {string} routeName
 */
const routeName = '/api/users/';


/**
* @param {Express} app
*/
const HomeController = (app) => {

    // get

    app.route(routeName).get((req, res) => {

        res.send('');
    });


}

module.exports = HomeController;