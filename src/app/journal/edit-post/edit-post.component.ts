import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DailyUpdate} from '../../models/DailyUpdate';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JournalService} from '../journal.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postToEdit: DailyUpdate;
  postForm: FormGroup;
  competences: string[] = [];

  public constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private postService: JournalService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.postToEdit = new DailyUpdate( params["date"],params["rubrique"], params["competenceUtilisees"],
        params["intitule"],params["description"],params["problemesRencontres"], params["moyensDeResolution"],
        params["commentaires"],params["fichiers"]);
    });
    this.initForm();
  }

  ngOnInit() {
  }

  private initForm() {
    this.postForm = this.formBuilder.group({
      rubrique: [this.postToEdit.rubrique, Validators.required],
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
      intitule: [this.postToEdit.intitule, Validators.required],
      description: [this.postToEdit.description, Validators.required],
      problemesRencontres: [this.postToEdit.problemesRencontres],
      moyensDeResolution: [this.postToEdit.moyensDeResolution],
      commentaires: [this.postToEdit.commentaires],
    });
  }

  onSavePost() {
    const rubrique = this.postForm.get('rubrique').value;
    this.getCompétencesUtilisees();
    const competenceUtilisees = this.competences;
    const intitule = this.postForm.get('intitule').value;
    const description = this.postForm.get('description').value;
    const problemesRencontres = this.postForm.get('problemesRencontres').value;
    const moyensDeResolution = this.postForm.get('moyensDeResolution').value;
    const commentaires = this.postForm.get('commentaires').value;
    const fichiers = [];
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
    /*
        //test
        for (let entry of this.competences) {
          console.log('compétences :' + entry);
        }
      */
  }
}
