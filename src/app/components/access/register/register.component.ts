import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() public showPanel: EventEmitter<string> = new EventEmitter<string>()

  public submitted = false;

  public form: FormGroup = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
    'full_name': ['', Validators.required],
    'username': ['', Validators.required]
  });

  constructor(
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  get f() { return this.form.controls; }

  public showPanelLogin(): void {
    this.showPanel.emit('login')
  }

  public cadastrar(): void {

    this.submitted = true;

    if(this.form.invalid){
      return;
    }

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
