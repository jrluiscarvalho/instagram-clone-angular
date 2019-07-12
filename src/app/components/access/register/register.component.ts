import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() public showPanel: EventEmitter<string> = new EventEmitter<string>()

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'full_name': new FormControl(null),
    'username': new FormControl(null),
    'password': new FormControl(null),
  });

  constructor(
    private authentication: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public showPanelLogin(): void {
    this.showPanel.emit('login')
  }

  public cadastrar(): void {
    let user: User = new User(
      this.form.value.email,
      this.form.value.full_name,
      this.form.value.username,
      this.form.value.password
    )

    this.authentication
      .registerUser(user)
      .then((res:any) => {
        this.showPanelLogin()
      });

  }

}
