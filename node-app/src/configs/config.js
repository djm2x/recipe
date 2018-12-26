const user = '';
const password = '';
const host = 'localhost';
const port = 27017;
const database = 'recetteDB'
const uri = `mongodb://${user}:${password}@${host}:${port}/${database}`
const uri2 = 'mongodb+srv://root:toor@cluster0-gaygx.mongodb.net/recetteDB';

module.exports = {
    url: uri2,
    'secret': 'secret-key',
    ROLEs: ['USER', 'ADMIN', 'PM'],
};