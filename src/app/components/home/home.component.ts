import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/services/authentication.services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authentication: Authentication) { }

  ngOnInit() {
  }

  public sair(): void {
    this.authentication.logout()
  }

}
