import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  public email: string;
  public publications: any;

  constructor(private dbService:DbService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.email = user.email

      this.updateTimeline();
    })
  }

  public updateTimeline(): void {
    this.dbService.getPublications(this.email)
      .then((publications: any) => {
        this.publications = publications;
      })
  }
}
