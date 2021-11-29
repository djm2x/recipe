const context = require('../models/dbContext');
const Metier = require('../models/models');

const tableName = 'metier'

metierController = {
    post: (req, res) => {
        let o = new Metier();
        o = JSON.parse(req.body.object);
        // console.log(JSON.parse(req.body.object));
        // console.log(req.files[0]);
    
        context(`insert into ${tableName} values (?, ?, ?)`, [o.id, o.nom, o.imageUrl])
            .then(
                r => {
                    res.json(r.affectedRows);
                },
                e => {
                    res.send(e);
                },
            )
    },
    
    getList: (req, res) => {
        context(`select * from ${tableName}`)
            .then(
                (r) => {
                    res.json(r);
                    // console.log('request have been made');
                },
                e => {
                    res.send(e);
                },
            )
    },
    
    get: (req, res) => {
        context(`select * from ${tableName} where id = ?`, [req.params.id])
        .then(
            (r) => {
                res.json(r[0]);
                // console.log(r[0]);
            },
            e=> {
                res.send(e);
            },
        )
    },
    
    delete$: (req, res) => {
        context(`delete from ${tableName} where id = ?`, [req.params.id])
        .then(
            (r) => {
                res.json(r[0]);
                // console.log(r[0]);
            },
            e=> {
                res.send(e);
            },
        )
    },
    
    put: (req, res) => {
        let o = new Metier();
        o = req.body;
        const sql = `update ${tableName} set nom = ? where id = ?`
        context(sql, [o.nom, req.params.id])
        .then(
            (r) => {
                res.json(r[0]);
                // console.log(r[0]);
            },
            e=> {
                res.send(e);
            },
        )
    }
}

module.exports = metierController;

// class Metier {
//     constructor() {
//         this.id = 0;
//         this.nom = '';
//     }
// }
