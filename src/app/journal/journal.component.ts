import { Component, OnInit } from '@angular/core';
import {DailyUpdate} from '../models/DailyUpdate';
import {Subscription} from 'rxjs';
import {JournalService} from './journal.service';
import {NavigationExtras, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogueComponent} from '../dialogue/dialogue.component';
import Reference = firebase.storage.Reference;

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  listePosts: DailyUpdate[];
  postSubscription: Subscription;

  constructor(private postService: JournalService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.postSubscription = this.postService.postSubject.subscribe(
      (listePosts: DailyUpdate[]) => {
        this.listePosts = listePosts;
      }
    );
    this.postService.emitPosts();
  }

  onEdit(post: DailyUpdate) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "commentaires": post.commentaires,
        "moyensDeResolution": post.moyensDeResolution,
        "problemesRencontres": post.problemesRencontres,
        "competenceUtilisees": post.competenceUtilisees,
        "intitule": post.intitule,
        "rubrique": post.rubrique,
        "date": post.date,
        "description": post.description,
      }
    };
    this.router.navigate(['/editPost'],navigationExtras);
  }

  openDialog(post: DailyUpdate): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogueComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {if (data){this.postService.removePost(post)}}
    );
  }

  getDlLink(fichier: Reference) {
    console.log("getDLLINK" + fichier.toString());
  }
}
