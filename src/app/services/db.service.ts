import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { ProgressService } from './progress.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private progressService: ProgressService) { }

  public publicar(data:any): void {

    let nomeImagem = Date.now();

    firebase
      .storage()
      .ref()
      .child(`imagens/${nomeImagem}`)
      .put(data.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot:any) => {
          this.progressService.status = 'em andamento'
          this.progressService.estado = snapshot
        },
        (error) => {
          this.progressService.status = 'erro'
        },
        () => {
          this.progressService.status = 'concluido'
        }
      )
  }
}
