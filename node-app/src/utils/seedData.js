const User = require('../models/models').User;
const Recette = require('../models/models').Recette;
const Categorie = require('../models/models').Categorie;
const ObjectId = mongoose.Types.ObjectId;

module.exports = seedData = {
    seedAdminUser: () => {
        const u = new User({
            nom: 'Mourabit',
            prenom: 'Mohamed',
            email: 'dj-m2x@angular.io',
            role: '1988',
            password: '123456',
            civilite: '1',
            imgUrl: '',
        });

        u.save().then(docs => console.log(`admin iserted`)).catch(e => console.log(e));
    },
    seedUsers: () => {
        let list = [];

        list.push(
            new User({
                nom: 'Ati',
                prenom: 'Issam',
                email: 'issam@email.com',
                password: '123456',
                civilite: '1',
                imgUrl: '',
            }),
            new User({
                nom: 'Salama',
                prenom: 'Anas',
                email: 'Anas@email.com',
                password: '123456',
                civilite: '1',
                imgUrl: '',
            }),
            new User({
                nom: 'Benhamida',
                prenom: 'Omar',
                email: 'Omar@email.com',
                password: '123456',
                civilite: '1',
                imgUrl: '',
            }),
        );

        list.forEach((u, i) => {
            u.save().then(docs => console.log(`user n°${i} iserted`)).catch(e => console.log(e));
        });
    },
    seedRecettes: async () => {
        let list = [];
        const ids = await User.find();
        const cats = await Categorie.find();
        list.push(
            new Recette({//1
                nom: 'Tarte au fromage de chèvre et crème fraîche',
                discription: '',
                tempsPreparation: '00:20',
                tempsCuisin: '00:30',
                tempsRepos: '00:00',
                cout: 0,
                difficulte: 0,
                nbPersonne: 2,
                astuce: `Le fromage de chèvre en forme de bûche comme le Sainte-Maure est parfait pour réaliser cette recette. 
                        Côté parfum une pincée d'herbes de Provence ou quelques feuilles de sauge ciselées grossièrement sont les bienvenues.`,
                imgUrl: 'recettes/creme-fraiche.jpg',
                videoUrl: '',
                idUser: ObjectId(ids[0]._id),
                idCategorie: ObjectId(cats[0]._id),
                ingredients: [
                    { nom: 'pâte feuilletée', quantite: 1, mesure: 'rouleau' },
                    { nom: 'fromage de chèvre', quantite: 150, mesure: 'g' },
                    { nom: 'lardons', quantite: 50, mesure: 'g' },
                    { nom: 'œufs entiers', quantite: 3, mesure: '' },
                    { nom: 'crème fraîche liquide', quantite: 20, mesure: 'cl' },
                    { nom: 'self, poivre', quantite: 0, mesure: '' },
                ],
                etapPreparations: [
                    { description: 'Préchauffez le four à 210°C.' },
                    { description: 'Déroulez la pâte feuilletée dans un moule à tarte recouvert de papier sulfurisé.' },
                    { description: 'Piquez le fond avec une fourchette.' },
                    { description: 'Coupez le fromage de chèvre en tranches. Répartissez-les sur le fond de pâte feuilletée dans le moule à tarte.' },
                    { description: 'Ajoutez les lardons sur le dessus.' },
                    { description: 'Battez les oeufs entiers avec la crème fraîche liquide dans un bol. Salez et poivrez selon vos goût puis mélangez. Versez le tout sur les tranches de chèvre et les lardons dans le moule.' },
                    { description: 'Enfournez et faites cuire la tarte au chèvre et aux lardons pendant 30 minutes, jusqu’à ce qu’elle soit bien dorée.' },
                    { description: 'A la sortie du four, laissez tiédir la tarte au chèvre et aux lardons sur une grille puis démoulez-la sur un plat de service.' },
                    { description: `Dégustez la tarte au chèvre et aux lardons tiède ou froide accompagnée d'une salade verte assaisonnée.` },
                ],
            }),
            new Recette({//2
                nom: 'Tarte tatin aux tomates et au comté',
                discription: '',
                tempsPreparation: '00:20',
                tempsCuisin: '00:35',
                tempsRepos: '00:02',
                cout: 1,
                difficulte: 0,
                nbPersonne: 4,
                imgUrl: 'recettes/tarte-tatin.jpg',
                videoUrl: '',
                idUser: ObjectId(ids[0]._id),
                idCategorie: ObjectId(cats[2]._id),
                ingredients: [
                    { nom: 'pâte feuilletée prête à être abaissée', quantite: 1, mesure: '' },
                    { nom: 'tomates olivettes coupées en 2', quantite: 6, mesure: '' },
                    { nom: 'oignon coupé en tranches fines', quantite: 1, mesure: '' },
                    { nom: 'cassonade (sucre roux)', quantite: 220, mesure: 'g' },
                    { nom: 'poignée de comté râpé', quantite: 1, mesure: '' },
                    { nom: 'vinaigre balsamique', quantite: 1, mesure: 'c. à soupe' },
                    { nom: 'beurre', quantite: 20, mesure: 'g' },
                ],
                etapPreparations: [
                    { description: 'Préchauffez le four th.6 (180°C).' },
                    { description: `Disposez les tomates coupées en 2 sur une plaque de cuisson en une seule couche, faites cuire 20 min dans le four, jusqu'à ce qu'elles soient tendres et dorées.` },
                    { description: `Faites cuire l'oignon dans le beurre, jusqu'à ce qu'il blondisse, ajoutez 1 c. à soupe de sucre en poudre et le vinaigre balsamique, prolongez la cuisson jusqu'à ce que l'oignon caramélise.` },
                    { description: `Préparez un sirop de sucre : faites chauffer à feu doux le sucre restant et 1 c. à soupe d'eau jusqu'à l'obtention d'un sirop épais et foncé.` },
                    { description: `Beurrez un moule à tarte, répartissez-y le sirop puis le comté râpé et les tomates, couvrez avec le mélange à base d'oignon.` },
                    { description: `Recouvrez le tout avec la pâte feuilletée, en rentrant bien les bords à l'intérieur du moule.` },
                    { description: `Enfournez pendant 30 min environ, jusqu'à ce que la pâte soit dorée.` },
                    { description: `Laissez reposer 2 min, démoulez sur une assiette de service.` },
                    { description: `Dégustez.` },
                ],
                astuce: ``
            }),
            new Recette({//3
                nom: 'Verrine de tartare aux deux saumons',
                discription: '',
                tempsPreparation: '00:10',
                tempsCuisin: '00:00',
                tempsRepos: '00:00',
                cout: 1,
                difficulte: 1,
                nbPersonne: 4,
                imgUrl: 'recettes/verrine.jpg',
                videoUrl: '',
                idUser: ObjectId(ids[1]._id),
                idCategorie: ObjectId(cats[3]._id),
                ingredients: [
                    { nom: 'saumon frais', quantite: 250, mesure: 'g' },
                    { nom: 'saumon fumé', quantite: 250, mesure: 'g' },
                    { nom: 'Sojasun Cuisine', quantite: 100, mesure: 'g' },
                    { nom: 'échalote ciselée', quantite: 1, mesure: '' },
                    { nom: 'sauce Worcestershire', quantite: 1, mesure: 'c. à café' },
                    { nom: `huile d'olive vierge`, quantite: 2, mesure: 'c. à soupe' },
                    { nom: 'sel, poivre du moulin', quantite: 0, mesure: '' },
                ],
                etapPreparations: [
                    { description: 'Épluchez l’échalote, ciselez-la. Mélangez-la avec le Sojasun Cuisine. Ajoutez l’huile, assaisonnez de sel et de poivre à votre convenance. Agrémentez de sauce Worcestershire. Mélangez bien et placez au froid.' },
                    { description: `Prenez les deux saumons. Coupez-les en petits dés. L’idéal est d’avoir des pavés de saumon, qui se coupent donc plus facilement en petits dés. Mettez-les dans un saladier.` },
                    { description: `Sortez la sauce du réfrigérateur. Versez-la sur les saumons. Mélangez délicatement avec la sauce. Ajoutez avant de servir de la ciboulette, du persil, de l’estragon… Ajustez avec quelques gouttes de citron pour relever le goût. Remettez au réfrigérateur au moins 1h avant de servir. Mieux, déposez-les au congélateur 15 à 20 min. Ainsi, les verrines de tartare aux deux saumons seront très fraîches !` },
                    { description: `Servez avec du pain de campagne grillé ou sur des feuilles d’endives rouges ou classiques.` },
                ],
                astuce: `La sauce Worcestershire est une sauce anglaise de couleur noire, au goût sucré. Elle se trouve dans le rayon des sauces avec les pâtes ou alors dans le rayon de saveurs du monde, en fonction des grandes surfaces. Son goût fait penser à celui du vinaigre balsamique de Modène, sorte de crème. Pour relever davantage, ajoutez des baies roses dans la sauce et en guise de décoration au moment de servir. Concernant le saumon, si vous avez un bon mixeur, préférez un pavé de saumon congelé, de sorte que vous ne serez pas obligé de le mettre au congélateur avant de servir et vous aurez votre apéritif très frais.`
            }),
            new Recette({//4
                nom: 'Verrine au mascarpone, thon, pêches et tomates',
                discription: `Epatez vos convives en leur proposant une délicieuse verrine au mascarpone, thon, pêches et tomates. En associant la douceur du mascarpone au thon et aux saveurs sucrées des pêches et des tomates, vous étonnerez vos invités. Ils seront forcément ravis par cette délicieuse entrée à la fois gourmande et originale. Rapides à réaliser, ces verrines pourront être préparées à l’avance. Vous n’aurez alors plus qu’à les sortir du réfrigérateur au dernier moment !`,
                tempsPreparation: '00:10',
                tempsCuisin: '00:00',
                tempsRepos: '00:00',
                cout: 0,
                difficulte: 0,
                nbPersonne: 4,
                imgUrl: 'recettes/verrines-aux-rillettes-de-thon.jpg',
                videoUrl: '',
                idUser: ObjectId(ids[1]._id),
                idCategorie: ObjectId(cats[2]._id),
                ingredients: [
                    { nom: 'boîte de thon au naturel de 160 g', quantite: 1, mesure: '' },
                    { nom: 'mascarpone', quantite: 4, mesure: ' c. à soupe' },
                    { nom: 'pêches jaunes', quantite: 2, mesure: '' },
                    { nom: 'tomates', quantite: 2, mesure: '' },
                    { nom: 'Une dizaine de brins de ciboulette', quantite: 0, mesure: '' },
                    { nom: 'Sel, poivre', quantite: 0, mesure: '' },
                ],
                etapPreparations: [
                    { description: 'Lavez les pêches jaunes, les tomates et les brins de ciboulette. Séchez le tout à l’aide de papier absorbant.' },
                    { description: `Epluchez les pêches et découpez-les en petits dés, tout comme les tomates. Réservez-les dans un saladier. Ajoutez-y le thon égoutté et émietté ainsi que le mascarpone. Salez et poivrez. Ajoutez la ciboulette ciselée, tout en conservant quelques brins pour la décoration. Mélangez délicatement pour bien répartir le mascarpone.` },
                    { description: `Dressez les verrines au mascarpone, thon, pêches et tomates. Garnissez chaque verrine de la préparation, à l’aide d’une cuillère à soupe. Surmontez-les de brins de persil.` },
                    { description: `Réservez les verrines au mascarpone, thon, pêches et tomates au réfrigérateur jusqu’au moment de servir.` },
                ],
                astuce: `Vous pouvez facilement utiliser un petit bouquet de persil plat à la place de la ciboulette si vous n’en avez pas trouvé chez votre maraîcher habituel. Optez également pour des pêches au sirop, lorsque ce n’est plus la saison. Vous n’aimez pas le mascarpone ? Remplacez-le simplement par un filet d’huile d’olive pour marier les ingrédients entre eux. Apportez une note de croquant en proposant cette préparation à base de mascarpone, thon, pêches et tomates sur de belles tartines de pain grillé, à défaut de verrines`
            }),
            new Recette({//5
                nom: 'Poulet rôti aux pommes et Roquefort Société',
                discription: `Epatez vos convives en leur proposant une délicieuse verrine au mascarpone, thon, pêches et tomates. En associant la douceur du mascarpone au thon et aux saveurs sucrées des pêches et des tomates, vous étonnerez vos invités. Ils seront forcément ravis par cette délicieuse entrée à la fois gourmande et originale. Rapides à réaliser, ces verrines pourront être préparées à l’avance. Vous n’aurez alors plus qu’à les sortir du réfrigérateur au dernier moment !`,
                tempsPreparation: '00:20',
                tempsCuisin: '01:15',
                tempsRepos: '00:00',
                cout: 1,
                difficulte: 1,
                nbPersonne: 4,
                imgUrl: 'recettes/poulet-roti-aux-pommes-et-roquefort-societe.png',
                videoUrl: '',
                idUser: ObjectId(ids[2]._id),
                idCategorie: ObjectId(cats[2]._id),
                ingredients: [
                    { nom: 'Roquefort Société®', quantite: 150, mesure: 'g' },
                    { nom: 'poulet fermier à rôtir (1,4 kg environ)', quantite: 1, mesure: '' },
                    { nom: 'pommes de terre grenaille', quantite: 1, mesure: 'kg' },
                    { nom: 'beurre', quantite: 80, mesure: 'g' },
                    { nom: 'champignons de Paris', quantite: 40, mesure: 'g' },
                    { nom: 'lardons fumés', quantite: 200, mesure: 'g' },
                    { nom: 'Branches de romarin', quantite: 0, mesure: '' },
                    { nom: 'Sel', quantite: 0, mesure: '' },
                    { nom: 'Poivre du moulin', quantite: 0, mesure: '' },
                ],
                etapPreparations: [
                    { description: 'Lavez les pêches jaunes, les tomates et les brins de ciboulette. Séchez le tout à l’aide de papier absorbant.' },
                    { description: `Epluchez les pêches et découpez-les en petits dés, tout comme les tomates. Réservez-les dans un saladier. Ajoutez-y le thon égoutté et émietté ainsi que le mascarpone. Salez et poivrez. Ajoutez la ciboulette ciselée, tout en conservant quelques brins pour la décoration. Mélangez délicatement pour bien répartir le mascarpone.` },
                    { description: `Dressez les verrines au mascarpone, thon, pêches et tomates. Garnissez chaque verrine de la préparation, à l’aide d’une cuillère à soupe. Surmontez-les de brins de persil.` },
                    { description: `Réservez les verrines au mascarpone, thon, pêches et tomates au réfrigérateur jusqu’au moment de servir.` },
                ],
                astuce: `Vous pouvez facilement utiliser un petit bouquet de persil plat à la place de la ciboulette si vous n’en avez pas trouvé chez votre maraîcher habituel. Optez également pour des pêches au sirop, lorsque ce n’est plus la saison. Vous n’aimez pas le mascarpone ? Remplacez-le simplement par un filet d’huile d’olive pour marier les ingrédients entre eux. Apportez une note de croquant en proposant cette préparation à base de mascarpone, thon, pêches et tomates sur de belles tartines de pain grillé, à défaut de verrines`
            }),
            new Recette({//6
                nom: `Veau Orloff à l'ancienne`,
                discription: `Votre grand-mère vous a peut-être déjà cuisiné un délicieux veau Orloff dont le souvenir ne vous a pas quitté et que vous aimeriez déguster de nouveau. Heureusement, vous allez pouvoir vous aussi préparer ce plat typique et goûteux grâce à cette recette de veau Orloff à l'ancienne que nous vous proposons de découvrir ici en détails.`,
                tempsPreparation: '00:30',
                tempsCuisin: '03:30',
                tempsRepos: '00:00',
                cout: 1,
                difficulte: 0,
                nbPersonne: 4,
                imgUrl: 'recettes/veau-orloff.jpg',
                videoUrl: '',
                idUser: ObjectId(ids[2]._id),
                idCategorie: ObjectId(cats[2]._id),
                ingredients: [
                    { nom: 'rôti de veau dans la noix pâtissière', quantite: 700, mesure: 'g' },
                    { nom: 'emmental râpé', quantite: 125, mesure: 'g' },
                    { nom: 'champignons de Paris', quantite: 200, mesure: 'g' },
                    { nom: 'beurre', quantite: 4, mesure: 'c. à soupe' },
                    { nom: `huile d'olive`, quantite: 1, mesure: 'c. à café ' },
                    { nom: 'farine', quantite: 3, mesure: 'c. à soupe' },
                    { nom: 'lait', quantite: 50, mesure: 'cl' },
                    { nom: 'sel fin, poivre blanc du moulin', quantite: 0, mesure: '' },
                ],
                etapPreparations: [
                    { description: `Pour la première étape de cette recette de rôti de veau Orloff, versez de l'huile d'olive dans une cocotte suffisamment grande pour accueillir votre rôti de veau. Disposez-le dans celle-ci et dorez-le sur toutes ses faces. Laissez-le cuire ensuite à couvert, sur feu doux, pendant environ 1h30. Ne salez et poivrez la viande qu’en fin de cuisson.` },
                    { description: `Epluchez les champignons de Paris, coupez la base de leur pied et émincez-les en lamelles. Faites-les revenir dans une poêle à couvert avec 1 c. à soupe de beurre, sur feu doux, pendant environ 15 min.` },
                    { description: `Pour la réalisons de la sauce béchamel, faites fondre le beurre dans une casserole, ajoutez ensuite la farine puis le lait. Fouettez la sauce jusqu'à ce qu'elle soit crémeuse est homogène. Salez et poivrez selon votre convenance. Incorporez ensuite le fromage râpé.` },
                    { description: `Réduisez les champignons de Paris cuits en purée, à la moulinette, voire au mixeur. Mélangez cette purée avec quelques c. à soupe de sauce béchamel, jusqu’à l'obtention d’une pâte onctueuse.` },
                    { description: `Découpez le rôti en tranche. Nappez chacune d’elles de purée de champignons. Reconstituez le rôti. Et versez sur celui-ci de sauce béchamel. Enfin, prolongez la cuisson du veau, sur feu doux, pendant 1 heure dans la même cocotte.` },
                    { description: `Dressez votre rôti sur un plat de service chaud et servez votre viande de boeuf à l'ancienne aussitôt.` },
                ],
                astuce: `Vous pouvez ajouter à la sauce Béchamel 2 tranches de bacon, finement hachées. Le plat gagnera ainsi en saveurs et en originalité. Il est également possible de cuire votre rôti au four à 225°C. Ajustez le temps de cuisson en fonction de son poids, soit 1h de cuisson par kg.`
            }),
        );

        list.forEach((u, i) => {
            u.save().then(docs => console.log(`recette n°${i} iserted`)).catch(e => console.log(e));
        });
    },
}

async function users() {
    const ids = await User.find();
}
