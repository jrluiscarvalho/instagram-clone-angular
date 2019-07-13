import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../model/user.model';
import * as firebase from 'firebase'
import { ErrorHandlerService } from './errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public token_id: string;

  constructor(private router: Router, private errorHandler: ErrorHandlerService){ }

  public registerUser(user: User): Promise<any> {

    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res: any) => {

        delete user.password;

        firebase
        .database()
        .ref(`user_detail/${btoa(user.email)}`)
        .set(user)
      })
      .catch((error: Error) => {
        this.errorHandler.errorMessage(error)
      })

  }

  public auth(email: string, password: string): void{
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res: any) =>{
        firebase.auth().currentUser.getIdToken()
          .then(idToken => {
            this.token_id = idToken
            localStorage.setItem('idToken', idToken )
            this.router.navigate(['/home'])
          })
      })
      .catch((err: Error) =>{
        this.errorHandler.errorMessage(err)
      })
  }

  public authenticated(): boolean {

    if(this.token_id === undefined && localStorage.getItem('idToken') !== null){
      this.token_id = localStorage.getItem('idToken')
    }

    if(this.token_id === undefined){
      this.router.navigate(['/'])
    }

    return this.token_id !== undefined
  }

  public logout(): void {
    firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem('idToken')
      this.token_id = undefined
      this.router.navigate(['/'])
    })
  }

}
