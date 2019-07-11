import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {

    firebase.initializeApp({
      apiKey: "AIzaSyD5J3FjZG4YULjdwshZGgY2mcijOX7KOjg",
      authDomain: "jta-instagram-clone-16763.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-16763.firebaseio.com",
      projectId: "jta-instagram-clone-16763",
      storageBucket: "",
      messagingSenderId: "270287201621",
      appId: "1:270287201621:web:3db541515d9c14e9"
    })
  }
  title = 'instagram';

}
