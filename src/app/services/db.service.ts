import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { ProgressService } from './progress.service';
import { ErrorHandlerService } from './errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private progressService: ProgressService, private errorHandler: ErrorHandlerService) { }

  public publicar(data:any): void {

    firebase
    .database()
    .ref(`publicacoes/${btoa(data.email)}`)
    .push({title: data.title})
    .then((resp:any) => {

      let imageName = resp.key;

      firebase
      .storage()
      .ref()
      .child(`images/${imageName}`)
      .put(data.image)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot:any) => {
          this.progressService.status = 'in progress'
          this.progressService.state = snapshot
        },
        (error) => {
          this.progressService.status = 'erro'
        },
        () => {
          this.progressService.status = 'finished'
        }
        )
      })
      .catch((error: Error) => {
        this.errorHandler.errorMessage(error)
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
            .child(`images/${item.key}`)
            .getDownloadURL()
            .then((url: string) => {
              item.url_image = url;

              firebase
              .database()
              .ref(`user_detail/${btoa(email)}`)
              .once('value')
              .then((snapshot: any) => {
                item.username = snapshot.val().username;
              })
            })
          })
          resolve(publications)
        })
        .catch((error: Error) => {
          reject(error)
        })
      });
    }
  }
