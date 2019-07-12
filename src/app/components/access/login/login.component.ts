import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public showPanel: EventEmitter<string> = new EventEmitter<string>()

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null)
  })

  constructor(
    private authentication: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public showRegisterPanel():void {
    this.showPanel.emit('register')
  }

  public auth(): void {
    this.authentication.auth(this.form.value.email, this.form.value.password)
  }

}
