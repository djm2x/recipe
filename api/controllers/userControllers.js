var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const model = require('../models/models').User;
const secret = require('../configs/config').secret;
module.exports = userController = {
    // register action
    signup: (req, res) => {
        let obj = new model(req.body);

        // obj.password = bcrypt.hashSync(obj.password, 8);

        obj.save()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(e => {
                console.log(e);
                res.status(400).send(e);
            });
    },
    //login
    logIn: (req, res) => {


        model.findOne({ email: req.body.email/*, password: req.body.password*/ }/*, {nom: true, prenom: true},*/)
            .then(user => {
                if (!user) {
                    return res.status(500).send('Email est incorrecte');
                }

                // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                // if (!passwordIsValid) {
                //     return res.status(401).send('Mot pass est incorrecte');
                // }
                // here is all good

                const token = jwt.sign({ id: user._id }, secret, { expiresIn: 30*86400 /* second/ expires in 24 hours */ });
                // user.password = '';
                res.status(200).send({ auth: true, user: user,accessToken: token });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    put: (req, res) => {
        let obj;
        try {
            obj = JSON.parse(req.body.object);
        } catch (error) {
            console.log('JSON.parse error');
            return res.status(400).send('JSON.parse error');
        }

        model.find({ email: obj.email })
            .countDocuments().then(r => {
                if (r <= 1) {
                    model.findByIdAndUpdate(req.params.id, obj, { new: true })
                        .then(docs => {
                            res.status(200).json(docs);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).send(err);
                        });
                } else {
                    console.log('email exsite already : ', r);
                    res.status(500).send(`email exsite already : ${r}`);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },
    
    get: (req, res) => {
        model.findById(req.params.id)
            .then(user => {
                if (!user) {
                    res.status(404).send('utilisateur pas trouver');
                    return;
                }
                // user.password = '';
                res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    delete$: (req, res) => {
        model.findByIdAndDelete(req.params.id)
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                console.log(err);
                res.status(500).send(err);
            });
    },
    
    getList: (req, res) => {
        model.find()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },
}
