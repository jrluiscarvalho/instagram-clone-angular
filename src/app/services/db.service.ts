import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { ProgressService } from './progress.service';
import { IncluirPublicacaoComponent } from '../components/home/incluir-publicacao/incluir-publicacao.component';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private progressService: ProgressService) { }

  public publicar(data:any): void {

    firebase
    .database()
    .ref(`publicacoes/${btoa(data.email)}`)
    .push({titulo: data.titulo})
    .then((resp:any) => {

      let nomeImagem = resp.key;

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
      })
    }

    public getPublications(email: string): Promise<any> {

      return new Promise((resolve, reject) => {
        firebase
        .database()
        .ref(`publicacoes/${btoa(email)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {

          let publications: Array<any> = [];

          snapshot.forEach((item: any) => {
            let publication = item.val()
            publication.key = item.key
            publications.push(publication)
          });
          return publications.reverse();
        })
        .then((publications: any) => {

          publications.forEach(item => {
            firebase
            .storage()
            .ref()
            .child(`imagens/${item.key}`)
            .getDownloadURL()
            .then((url: string) => {
              item.url_image = url;

              firebase
              .database()
              .ref(`usuario_detalhe/${btoa(email)}`)
              .once('value')
              .then((snapshot: any) => {
                item.nome_usuario = snapshot.val().nome_usuario;
              })
            })
          })
          resolve(publications)
        })
      });
    }
  }