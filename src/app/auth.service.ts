import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) { 
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$
    .pipe(switchMap(user => {
      if( user ) {
        return this.userService.get(user.uid).valueChanges();
      }
        return of(null);
    }));
  }
}
