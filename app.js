const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;



const mongoose = require('mongoose');

// Or using promises
mongoose.connect(`mongodb://localhost:27017/testDB`, { useNewUrlParser: true })
  .then(
    r => console.log('Connected to MongoDB database'),
    e => console.log('Connection error : ', e)
  );
const Schema = mongoose.Schema;

UserClass = mongoose.model("User", new mongoose.Schema({
  nom: String,
  email: String,
  // recettes: [
  //   {type: Schema.Types.ObjectId, ref: 'Recette'}
  // ],
}));

RecetteClass = mongoose.model("Recette", new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  nom: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}));

NoteClass = mongoose.model("Note", new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  _id: {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    recette: { type: Schema.Types.ObjectId, ref: 'recette' },
  },
  note: Number,
}));

insert = () => {
  const promes = new Promise((res, rej) => {
    var user = new UserClass({
      name: 'Ian Fleming',
      email: 'dj@dj'
    });
  
    user.save(e => {
      if (e) console.log(e);
  
      var r = new RecetteClass({
        nom: 'Casino Royale',
        user: user._id    // assign the _id from the person
      });
  
      r.save(function (e) {
        if (e) console.log(e);
        // thats it!
        var n = new NoteClass({
          _id : { user: '5bd1cbdb761ed1162c858355', recette: '5bd1cbdc761ed1162c858356'},
          note: 1    // assign the _id from the person
        });
  
        n.save(e => console.log(e));
      });
    });
    res();
    rej();
  })
  return promes;
}



select = () => {
  RecetteClass.
    findOne({ nom: 'Casino Royale' }).
    populate('user').
    then(r => {
      console.log(r);
    });
}
insert().then(select);

testPromise = () => {
  const promes = new Promise((res, rej) => {
    res('ok');
    rej();
  });
  return promes;
}

testPromise().then( r => console.log('promesse work ', r));

app.listen(PORT, function () {
      console.log(`Example app listening on port ${PORT}!`)
    })