const model = require('../models/models').Carnet;
const ObjectId = mongoose.Types.ObjectId;

module.exports = recetteController = {

    post: (req, res) => {
        const obj = new model(req.body);
        obj.save()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(e => {
                console.log(e);
                res.status(400).send(e);
            });
    },

    delete$: (req, res) => {
        const _id = {
            idUser: ObjectId(req.params.idUser),
            idRecette: ObjectId(req.params.idRecette),
        };
        model.findByIdAndDelete(_id)
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    getState: (req, res) => {
        const _id = {
            idUser: ObjectId(req.params.idUser),
            idRecette: ObjectId(req.params.idRecette),
        };
        model.findById(_id)
            .then(docs => {
                if (docs) {
                    res.status(200).json(true);
                    return;
                }
                res.status(200).json(false);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    getList: (req, res) => {
        // const _id = {
        //     idUser: ObjectId(req.params.idUser),
        //     idRecette: ObjectId(req.params.idRecette),
        // };
        let countRecette;
        model.find({ '_id.idUser': ObjectId(req.params.idUser) })
            .countDocuments()
            .then(docs => countRecette = docs)
            .catch(err => {
                console.log(err);
                return res.status(500).send(err);
            });
        //
        console.log(req.params.idUser);
        model.find({ '_id.idUser': ObjectId(req.params.idUser) })
            .skip(parseInt(req.params.startIndex)) //Notice here
            .limit(parseInt(req.params.pageSize))
            .populate({
                path: '_id.idRecette',
                populate: {
                    path: 'idUser',
                    model: 'User'
                }
            })
            .then(docs => {
                res.status(200).json({ list: docs, count: countRecette });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },
}
