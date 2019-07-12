import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private authentication: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro():void {
    this.exibirPainel.emit('cadastro')
  }

  public auth(): void {
    this.authentication.auth(this.form.value.email, this.form.value.senha)
  }

}
