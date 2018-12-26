const config = require('../configs/config');
const ROLEs = config.ROLEs;
const model = require('../models/models').User;

checkDuplicateEmail = (req, res, next) => {
    // let obj = req.body;
    let body;
    try {
        body = JSON.parse(req.body.object);
    } catch (error) {
        console.log('JSON.parse error');
        res.status(400).send('JSON.parse error');
        return;
    }

    // obj.imgUrl = `users/${obj.imgUrl}`;

    model.findOne({ email: body.email })
        .then(r => {
            if (r === null) {
                req.body = body;
                next();
            } else {
                console.log('user existe deja');
                res.status(400).send('Email existe deja');
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send("Error retrieving User with Email = " + obj.email);
        });
}

// checkRolesExisted = (req, res, next) => {
//     for (let i = 0; i < req.body.roles.length; i++) {
//         if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
//             res.status(400).send("Fail -> Does NOT exist Role = " + req.body.roles[i]);
//             return;
//         }
//     }
//     next();
// }

const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;
// signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = checkDuplicateEmail;