const user = 'djm2x';
const password = '123';
const host = '194.163.148.222';
const port = 27017;
const database = 'recetteDB'
const uri = `mongodb://${user}:${password}@${host}:${port}/${database}`
const uri2 = 'mongodb+srv://root:toor@cluster0-gaygx.mongodb.net/recetteDB';

module.exports = {
    url: uri,
    'secret': 'secret-key',
    ROLEs: ['USER', 'ADMIN', 'PM'],
};