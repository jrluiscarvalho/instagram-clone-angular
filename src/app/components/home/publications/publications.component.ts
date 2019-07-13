import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import * as firebase from 'firebase'
import { ErrorHandlerService } from 'src/app/services/errorhandler.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  public email: string;
  public publications: any;

  constructor(private dbService:DbService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    try {
      firebase.auth().onAuthStateChanged(user => {
        this.email = user.email

        this.updateTimeline();
      })
    } catch (error) {
      this.errorHandler.errorMessage(error)
    }
  }

  public updateTimeline(): void {
    this.dbService.getPublications(this.email)
      .then((publications: any) => {
        this.publications = publications;
      })
      .catch((error: Error) => {
        this.errorHandler.errorMessage(error)
      })
  }
}
