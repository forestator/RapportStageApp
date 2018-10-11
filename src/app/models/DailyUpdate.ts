import {AngularFireStorageReference} from '@angular/fire/storage';
import Reference = firebase.storage.Reference;

export class DailyUpdate {
  date: string;
  rubrique: string;
  competenceUtilisees: string[];
  intitule: string;
  description: string;
  problemesRencontres: string;
  moyensDeResolution: string;
  commentaires: string;
  fichiers: Reference[];

  constructor(date: string, rubrique: string, competenceUtilisees: string[], intitule: string,
              description: string, problemesRencontres: string, moyensDeResolution: string,
              commentaires: string, fichiers: Reference[]) {
    this.date = new Date().toLocaleDateString();
    this.rubrique = rubrique;
    this.competenceUtilisees = competenceUtilisees;
    this.intitule = intitule;
    this.description = description;
    this.problemesRencontres = problemesRencontres;
    this.moyensDeResolution = moyensDeResolution;
    this.commentaires = commentaires;
    this.fichiers = fichiers;
  }
}
