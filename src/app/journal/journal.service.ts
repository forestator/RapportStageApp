import {Injectable} from '@angular/core';
import {DailyUpdate} from '../models/DailyUpdate';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  listePosts: DailyUpdate[] = [];
  postSubject = new Subject<DailyUpdate[]>();
  currentUserUid: string;

  emitPosts() {
    this.postSubject.next(this.listePosts);
  }

  savePosts() {
    firebase.database().ref('/journaux/'+this.currentUserUid).set(this.listePosts);
  }

  getJournal() {
    firebase.database().ref('/journaux/'+this.currentUserUid)
      .on('value', (data: DataSnapshot) => {
          this.listePosts = data.val() ? data.val() : [];
          this.emitPosts();
        }
      );
  }

  constructor(private authService: AuthService) {
    this.currentUserUid = this.authService.userDetails.uid;
    this.getJournal();
  }

  createNewPost(newPost: DailyUpdate) {
    this.listePosts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  //TODO
  editStats(newPost: DailyUpdate) {/*
    const statIndexToUpdate = this.listePosts.findIndex(
      (postToUpdate) => {
        if (postToUpdate.classeName === statsToEdit.classeName && postToUpdate.specName === statsToEdit.specName) {
          return true;
        }
      }
    );
    this.listePosts[statIndexToUpdate] = statsToEdit;
    this.savePosts();
    this.emitPosts();
    */
  }

  removePost(postToRemove: DailyUpdate) {
    this.listePosts.forEach((post, index) => {
      if (post == postToRemove)  {this.listePosts.splice(index,1); }
    });
    this.savePosts();
    this.emitPosts();
  }

  unsubscribe() {
    this.postSubject.unsubscribe();
  }
}
