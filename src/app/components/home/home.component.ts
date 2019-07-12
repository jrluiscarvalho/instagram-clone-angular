import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publications') public publications: any;

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  public sair(): void {
    this.authentication.logout()
  }

  public updateTimeline(): void {
    this.publications.updateTimeline();
  }

}
