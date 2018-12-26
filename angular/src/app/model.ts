//
//

export class User {
  _id = '';
  nom = '';
  prenom = '';
  email = '';
  password = '';
  dateNaissance = new Date();
  civilite = '1';
  apropos = '';
  role = 0;
  imgUrl = '';
}

export class Recette {
  _id: string;
  nom = '';
  discription = '';
  tempsPreparation = '00:00'; // {hours = 1; minutes = 0};
  tempsCuisin = '00:00';
  tempsRepos = '00:00';
  cout = '';
  difficulte = '';
  nbPersonne = 0;
  astuce = '';
  imgUrl = '';
  videoUrl = '';
  date = new Date();
  idUser: any = '';
  idCategorie = '';
  ingredients: Ingredient[] = [new Ingredient()];
  etapPreparations: EtapPreparation[] = [new EtapPreparation()];
}


export class EtapPreparation {
  // _id = '';
  description = '';
  // _idRecette = '';
}
export class Ingredient {
  // _id = '';
  nom = '';
  quantite = 0;
  mesure = '';
  // _idRecette = '';
}

export class Comment {
  _id = String;
  description = '';
  date = new Date();
  idUser = '';
  // idUserNavigation: User;
  idRecette = '';
}

export class Categorie {
  _id = '';
  nom = '';
  // recettes: Recette[];
}

export class NoteUser {
  idUserDoLike = '';
  idUser = '';
  note = 0;
}

export class NoteComment {
  idUser = '';
  idComent = '';
  note = 0;
}

export class NoteRecette {
  _id = {
    idUser: '',
    idRecette: ''
  };
  note = 0;
}

export class Carnet {
  _id = {
    idUser: '',
    idRecette: ''
  };
  date = new Date();
}







