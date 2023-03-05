import { RecetteService } from './../shared/recette.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { CategorieService } from '../shared/categorie.service';
import { SessionService } from '../../auth/shared/session.service';
import { Router } from '@angular/router';
import { Categorie, User, Ingredient, EtapPreparation, Recette } from '../../model';

@Component({
  selector: 'app-add-recette',
  templateUrl: './add-recette.component.html',
  styleUrls: ['./add-recette.component.css'],
})
export class AddRecetteComponent implements OnInit {
  @Input() o: Recette = new Recette();
  @Output() eventToParent = new EventEmitter<any>();
  myForm: UntypedFormGroup;
  categories: Categorie[] = [];
  // colorInputFile = '';
  file: File;
  constructor(private fb: UntypedFormBuilder, private service: RecetteService, public router: Router,
    private categorieService: CategorieService, private session: SessionService) { }

  ngOnInit() {
    // because admin can update this, and we dont want his name in this recip
    if (this.o.idUser === '') {
      this.o.idUser = this.session.userID();
    }
    this.createForm();
    this.getCategories();
  }

  getCategories(): void {
    this.categorieService.getList()
      .subscribe(
        (r: Categorie[]) => {
          this.categories = r;
          // console.log(r);
        },
        e => console.log(e)
      );
  }

  createForm() {
    this.myForm = this.fb.group({
      _id: this.o._id,
      nom: [this.o.nom, [Validators.required]],
      discription: [this.o.discription, [Validators.required]],
      tempsPreparation: [this.o.tempsPreparation, [Validators.required]],
      tempsCuisin: [this.o.tempsCuisin, [Validators.required]],
      tempsRepos: [this.o.tempsRepos, [Validators.required]],
      cout: [this.o.cout, [Validators.required]],
      difficulte: [this.o.difficulte, [Validators.required]],
      nbPersonne: [this.o.nbPersonne, [Validators.required]],
      astuce: [this.o.astuce, [Validators.required]],
      idUser: this.o.idUser,
      idCategorie: [this.o.idCategorie, [Validators.required]],
      note: 0,
      imgUrl: [null, /*[Validators.required]*/],
      videoUrl: [this.o.videoUrl],
      ingredients: this.fb.array(this.o.ingredients.map(i => this.fb.group(i)) as UntypedFormGroup[]),
      etapPreparations: this.fb.array(this.o.etapPreparations.map(i => this.fb.group(i)) as UntypedFormGroup[]),
    });
  }

  getFileFromImgUpload(f: File) {
    this.file = f;
    console.log(this.file.name);
  }

  checkImageIfExiste(obj: any): FormData {
    const formData = new FormData();

    if (this.file === undefined) {
      obj.imgUrl = this.o.imgUrl;
      formData.append('object', JSON.stringify(obj));
      // formData.append('file', this.file, this.file.name);
      if (this.o._id === '') {
        return;
      }
    } else {
      obj.imgUrl = `recettes/${this.file.name}`;
      formData.append('object', JSON.stringify(obj));
      formData.append('file', this.file, this.file.name);
    }
    return formData;
  }
  submit(o: UntypedFormGroup) {
    const obj = o.value as User;
    console.log(obj);
    const formData = this.checkImageIfExiste(obj);

    if (this.o._id === undefined) {
      this.post(formData);
    } else {
      this.put(formData);
    }
  }

  post(o: any) {
    this.service.post(o)
      .subscribe(r => {
        this.router.navigate(['/recette/all']);
      }, e => {
        console.log(e.message);
      });
  }

  put(obj: any) {
    this.eventToParent.next(obj);
  }

  imgError(img: any) {
    img.src = '../../../assets/uploadIMG.png';
  }

  get getIngredients(): UntypedFormArray {
    return this.myForm.get('ingredients') as UntypedFormArray;
  }

  get getPreparations(): UntypedFormArray {
    return this.myForm.get('etapPreparations') as UntypedFormArray;
  }

  addIngredients() {
    this.getIngredients.push(this.fb.group(new Ingredient()));
  }

  addEtapPreparation() {
    this.getPreparations.push(this.fb.group(new EtapPreparation()));
  }

  deleteIngredient(i: number) {
    this.getIngredients.removeAt(i);
  }

  deleteEtap(i: number) {
    this.getPreparations.removeAt(i);
  }
}
