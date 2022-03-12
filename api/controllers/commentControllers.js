const model = require('../models/models').Comment;
//
const HUB = '/comments';
const ADD = 'add';
const EDIT = 'edit';
const DELETE = 'delete';
const COUNT = 'count';
module.exports = commentController = {

    post: (req, res) => {
        const obj = new model(req.body);

        obj.save()
            .then(docs => {
                model.findById(docs._id)
                    .populate('idUser')
                    .then(c => {
                        req.io.of(HUB).emit(ADD, {comment: c, idRecette: obj.idRecette});
                        req.io.of(HUB).emit(COUNT, {note: 1, idRecette: obj.idRecette});
                        res.status(200).json(ADD);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send(err);
                    });
            })
            .catch(e => {
                console.log(e);
                res.status(400).send(e);
            });
    },

    delete$: (req, res) => {
        const idComment = req.params.idComment;
        const idRecette = req.params.idRecette;

        model.findByIdAndDelete(idComment)
            .then(docs => {
                req.io.of(HUB).emit(DELETE, {idComment: idComment, idRecette: idRecette});
                req.io.of(HUB).emit(COUNT, {note: -1, idRecette: idRecette});
                res.status(200).json(DELETE);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    getList: (req, res) => {
        model.find({ idRecette: req.params.id })
            .populate('idUser')
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    },

    getCountComment: (req, res) => {
        model.find({ idRecette: req.params.id }).countDocuments()
            .then(docs => {
                // console.log(docs);
                res.status(200).json(docs);
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

    put: (req, res) => {
        const obj = req.body;
        // console.log(req.body);
        // console.log(obj);
        model.findByIdAndUpdate(obj._id, obj, { new: true })
            .then(docs => {
                model.findById(docs._id)
                .populate('idUser')
                .then(c => {
                    req.io.of(HUB).emit(EDIT, {comment: c, idRecette: obj.idRecette});
                    res.status(200).json(EDIT);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}
