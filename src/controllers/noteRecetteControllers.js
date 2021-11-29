const model = require('../models/models').NoteRecette;
const ObjectId = mongoose.Types.ObjectId;

const HUB = '/noteRecette';
const ADD = 'add';
const DELETE = 'delete';

module.exports = recetteController = {

    post: (req, res) => {
        const obj = new model(req.body);
        obj.save()
            .then(docs => {
                req.io.of(HUB).emit(ADD, docs);
                res.status(200).json(ADD);
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
                req.io.of(HUB).emit(DELETE, docs);
                res.status(200).json(DELETE);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    isLiked: (req, res) => {
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

    getNoteRecette: (req, res) => {
        model.find({ '_id.idRecette': req.params.idRecette })
            .then(docs => {
                let totalNote = 0;
                docs.map(doc => {
                    totalNote += doc.note;
                })
                res.status(200).json(totalNote);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },
}
