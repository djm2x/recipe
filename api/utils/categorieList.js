// const model = require('../models/modelss').Categorie;
const model = require('../models/models').Categorie;
cats = [
    { nom: 'Viandes' },
    { nom: 'Tartes et tourtes salées, pizzas' },
    { nom: 'Soupes' },
    { nom: 'Sauces, dips et pâtes à tartiner' },
    { nom: 'Poissons' },
    { nom: 'Plats végétariens' },
    { nom: 'Plat principal - divers' },
    { nom: 'Pâtisseries sucrées' },
    { nom: 'Pâtes & Riz' },
    { nom: 'Pains & Viennoiseries' },
    { nom: 'Entrées' },
    { nom: 'Desserts & Confiseries' },
    { nom: 'Boissons' },
    { nom: 'Basiques' },
    { nom: 'Alimentation pour nourrissons' },
    { nom: 'Accompagnements' },
];

insertCategorie = () => {
    console.log('shits begin >>>>>>>>>>>>>>>>>>>>>>>>>>');
    cats.forEach((e, i) => {
        const obj = new model(e);
        obj.save()
            .then(docs => {
                console.log('obj n°: ', i);
            })
            .catch(e => {
                console.log('shit error in n°: ', i);
            });

    });
}

module.exports = insertCategorie;