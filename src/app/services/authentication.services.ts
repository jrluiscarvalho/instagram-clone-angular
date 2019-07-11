import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Usuario } from '../model/usuario.model';
import * as firebase from 'firebase'

@Injectable()
export class Authentication{

  public token_id: string;

  constructor(private router: Router){ }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {

    return firebase
      .auth()
      .createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((res: any) => {

        delete usuario.senha;

        firebase
        .database()
        .ref(`usuario_detalhe/${btoa(usuario.email)}`)
        .set(usuario)
      })
      .catch((error: Error) => {
        console.log(error)
      })

  }

  public auth(email: string, senha: string): void{
    console.log(email)
    console.log(senha)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((res: any) =>{
        firebase.auth().currentUser.getIdToken()
          .then(idToken => {
            this.token_id = idToken
            localStorage.setItem('idToken', idToken )
            this.router.navigate(['/home'])
          })
      })
      .catch((err: Error) => console.log(err))
  }

  public authenticated(): boolean {

    if(this.token_id === undefined && localStorage.getItem('idToken') !== null){
      this.token_id = localStorage.getItem('idToken')
    }

    if(this.token_id === undefined){
      this.router.navigate(['/'])
    }

    return this.token_id === undefined
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
