import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule, Routes} from '@angular/router';
import {configFirebase} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {LoginComponent} from './auth/login/login.component';
import {UtilisateurComponent} from './auth/utilisateur/utilisateur.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatCheckboxModule, MatDialogModule
} from '@angular/material';
import {JournalComponent} from './journal/journal.component';
import {NewPostComponent} from './journal/new-post/new-post.component';
import {ReactiveFormsModule} from '@angular/forms';
import {JournalService} from './journal/journal.service';
import { DialogueComponent } from './dialogue/dialogue.component';
import { EditPostComponent } from './journal/edit-post/edit-post.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UtilisateurComponent, canActivate: [AuthGuard]},
  {path: 'journal', component: JournalComponent, canActivate: [AuthGuard]},
  {path: 'newPost', component: NewPostComponent, canActivate: [AuthGuard]},
  {path: 'editPost', component: EditPostComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UtilisateurComponent,
    JournalComponent,
    NewPostComponent,
    DialogueComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,

    // Angular Materials Modules
    BrowserAnimationsModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatSidenavModule, MatListModule, MatGridListModule, MatTableModule, MatPaginatorModule, MatSortModule,
    LayoutModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatCheckboxModule,
    MatDialogModule,

    //Requête API
    HttpClientModule,

    //Routing de l'application
    RouterModule.forRoot(appRoutes),

    //Angular Communication with Firebase
    AngularFireModule.initializeApp(configFirebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  exports: [
    // Angular Materials Modules
    BrowserAnimationsModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatSidenavModule, MatListModule, MatGridListModule, MatTableModule, MatPaginatorModule, MatSortModule,
    LayoutModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [AuthService, JournalService],
  bootstrap: [AppComponent],
  entryComponents: [DialogueComponent]
})
export class AppModule {
}
