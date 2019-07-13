import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public showPanel: EventEmitter<string> = new EventEmitter<string>()

  public submitted = false;

  public form: FormGroup = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  get f() { return this.form.controls; }

  public showRegisterPanel():void {
    this.showPanel.emit('register')
  }

  public auth(): void {
    this.submitted = true;

    if(this.form.invalid){
      return;
    }

    this.authentication.auth(this.form.value.email, this.form.value.password)
  }
}
