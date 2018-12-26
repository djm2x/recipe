const model = require('../models/models').Recette;
const modelCarnet = require('../models/models').Carnet;

module.exports = recetteController = {
    // register action
    post: (req, res) => {
        let obj;
        try {
            obj = new model(JSON.parse(req.body.object));
        } catch (error) {
            console.log('JSON.parse error');
            res.status(400).send('JSON.parse error');
            return;
        }
        // console.log(JSON.parse(req.body.object));
        obj.save()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(e => {
                res.status(400).send(e);
            });
    },

    getList: (req, res) => {
        let countRecette;
        model.find()
            .countDocuments()
            .then(docs => countRecette = docs)
            .catch(err => {
                console.log(err);
                return res.status(500).send(err);
            });
        //
        model.find()
            .skip(parseInt(req.params.startIndex)) //Notice here
            .limit(parseInt(req.params.pageSize))
            .populate('idUser')
            .then(docs => {
                // console.log(docs);
                res.status(200).json({ list: docs, count: countRecette });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    getListbyUser: (req, res) => {
        let countRecette;
        model.find({ idUser: req.params.id })
            .countDocuments()
            .then(docs => countRecette = docs)
            .catch(err => {
                console.log(err);
                return res.status(500).send(err);
            });
        //
        model.find({ idUser: req.params.id })
            .skip(parseInt(req.params.startIndex)) //Notice here
            .limit(parseInt(req.params.pageSize))
            .populate('idUser')
            .then(docs => {
                res.status(200).json({ list: docs, count: countRecette });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    get: (req, res) => {
        model.findById(req.params.id)
            .populate('idUser')
            .then(docs => {
                // console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    delete$: (req, res) => {
        model.findByIdAndDelete(req.params.id)
            .then(docs => {
                modelCarnet.findByIdAndDelete(req.params.id)
                res.status(200).json('ok');
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
            res.status(400).send('JSON.parse error');
            return;
        }

        model.findByIdAndUpdate(obj._id, obj, { new: true })
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}
