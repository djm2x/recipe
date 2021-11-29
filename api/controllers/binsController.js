const model = require('../models/models').Bins;

module.exports = binsController = {
    // register action
    post: (req, res) => {
        const obj = new model(req.body);
        obj.save()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(e => {
                res.status(400).json(e);
            });
    },

    getList: (req, res) => {
        model.find()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    get: (req, res) => {
        model.findById(req.params.id)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    delete$: (req, res) => {
        model.findByIdAndDelete(req.params.id)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    put: (req, res) => {
        model.findByIdAndUpdate(req.body._id, req.body, {new: true})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}