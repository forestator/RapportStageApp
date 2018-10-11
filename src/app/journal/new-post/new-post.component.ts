import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JournalService} from '../journal.service';
import {Router} from '@angular/router';
import {DailyUpdate} from '../../models/DailyUpdate';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import Reference = firebase.storage.Reference;

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  competences: string[] = [];
  currentFiles: Reference[] = [];
  private ref: AngularFireStorageReference;
  private task: AngularFireUploadTask;


  constructor(private formBuilder: FormBuilder, private postService: JournalService, private router: Router, private afStorage: AngularFireStorage) {
  }

  upload(event) {
    const randomId = Math.random().toString(10).substring(2);
    this.ref = this.afStorage.ref(this.postService.currentUserUid+'/'+randomId+'PereNoel'+event.target.files[0].name);
//    this.currentFiles.push(randomId+'PereNoel'+event.target.files[0].name);
    this.task = this.ref.put(event.target.files[0]);
    this.task.then(downloadUrl =>
      this.currentFiles.push(downloadUrl.ref)
      )
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.postForm = this.formBuilder.group({
      rubrique: ['', Validators.required],
      comp1: [''],
      comp2: [''],
      comp3: [''],
      comp4: [''],
      comp5: [''],
      comp6: [''],
      comp7: [''],
      comp8: [''],
      comp9: [''],
      comp10: [''],
      comp11: [''],
      comp12: [''],
      comp13: [''],
      comp14: [''],
      comp15: [''],
      comp16: [''],
      comp17: [''],
      intitule: ['', Validators.required],
      description: ['', Validators.required],
      problemesRencontres: [''],
      moyensDeResolution: [''],
      commentaires: [''],
    });
  }

  onSavePost() {
    const rubrique = this.postForm.get('rubrique').value;
    this.getCompétencesUtilisees();
    const competenceUtilisees = this.competences;
    const fichiers = this.currentFiles;
    const intitule = this.postForm.get('intitule').value;
    const description = this.postForm.get('description').value;
    const problemesRencontres = this.postForm.get('problemesRencontres').value;
    const moyensDeResolution = this.postForm.get('moyensDeResolution').value;
    const commentaires = this.postForm.get('commentaires').value;
    const newPost = new DailyUpdate(new Date().toJSON(), rubrique, competenceUtilisees, intitule,
      description, problemesRencontres, moyensDeResolution, commentaires, fichiers);
    this.postService.createNewPost(newPost);
    this.router.navigate(['/journal']);
    /*
        console.log('rubrique:' + rubrique);
        console.log('intitule:' + intitule);
        console.log('description:' + description);
        console.log('problemesRencontres:' + problemesRencontres);
        console.log('moyensDeResolution:' + moyensDeResolution);
        console.log('commentaires:' + commentaires);
        console.log('lienGoogleDrive:' + lienGoogleDrive);
    */
  }

  getCompétencesUtilisees() {
    const comp1 = this.postForm.get('comp1').value;
    const comp2 = this.postForm.get('comp2').value;
    const comp3 = this.postForm.get('comp3').value;
    const comp4 = this.postForm.get('comp4').value;
    const comp5 = this.postForm.get('comp5').value;
    const comp6 = this.postForm.get('comp6').value;
    const comp7 = this.postForm.get('comp7').value;
    const comp8 = this.postForm.get('comp8').value;
    const comp9 = this.postForm.get('comp9').value;
    const comp10 = this.postForm.get('comp10').value;
    const comp11 = this.postForm.get('comp11').value;
    const comp12 = this.postForm.get('comp12').value;
    const comp13 = this.postForm.get('comp13').value;
    const comp14 = this.postForm.get('comp14').value;
    const comp15 = this.postForm.get('comp15').value;
    const comp16 = this.postForm.get('comp16').value;
    const comp17 = this.postForm.get('comp17').value;

    if (comp1) {
      this.competences.push('Développer des composants d\'interface');
    }
    if (comp2) {
      this.competences.push('Maquetter une application');
    }
    if (comp3) {
      this.competences.push('Développer une  interface utilisateur');
    }
    if (comp4) {
      this.competences.push('Développer des composants d’accès aux données');
    }
    if (comp5) {
      this.competences.push('Développer la persistance des données');
    }
    if (comp6) {
      this.competences.push('Utiliser l’anglais dans son activité professionnelle en Informatique');
    }
    if (comp7) {
      this.competences.push('Développer une application n-tiers');
    }
    if (comp8) {
      this.competences.push('Concevoir une application');
    }
    if (comp9) {
      this.competences.push('Développer des composants métier');
    }
    if (comp10) {
      this.competences.push('Construire une application organisée en couches');
    }
    if (comp11) {
      this.competences.push('Concevoir une base de données');
    }
    if (comp12) {
      this.competences.push('Mettre en place une base de données');
    }
    if (comp13) {
      this.competences.push('Développer des composants dans le langage d’une base de données');
    }
    if (comp14) {
      this.competences.push('Collaborer à la gestion d\'un projet informatique');
    }
    if (comp15) {
      this.competences.push('Développer une application de mobilité numérique');
    }
    if (comp16) {
      this.competences.push('Préparer et exécuter les plans de tests d’une application');
    }
    if (comp17) {
      this.competences.push('Préparer et exécuter le déploiement d’une application');
    }

    /*
        //test
        for (let entry of this.competences) {
          console.log('compétences :' + entry);
        }
      */
  }
}
