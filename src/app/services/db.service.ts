import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  public publicar(data:any): void {

    let nomeImagem = Date.now();

    firebase
      .storage()
      .ref()
      .child(`imagens/${nomeImagem}`)
      .put(data.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapchot:any) => {
        },
        (error) => {
        },
        () => {
        }
      )
  }
}
