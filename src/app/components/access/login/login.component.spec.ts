import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr'
import { FirebaseService } from 'src/app/services/firebase.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [AuthenticationService, AuthGuard, FirebaseService],
      imports:[ReactiveFormsModule, RouterTestingModule, ToastrModule.forRoot()],
    })
    .compileComponents();
  }));

  afterEach(() => {
    localStorage.removeItem('idToken')
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(inject([FirebaseService], (service: FirebaseService) => {
    service.firebaseInitialize();
  }))

  it('should authenticate with valid credentials', inject([AuthenticationService], (service: AuthenticationService) => {
    service.auth('teste@teste.com', 'testes')
    expect(service.authenticated()).toBeTruthy();
  }));

  it('should authenticate with invalid credentials', inject([AuthenticationService], (service: AuthenticationService) => {
    service.auth('teste@teste.com', 'testes2')
    expect(service.authenticated()).toBeFalsy();
  }))

  it('should user is not authenticated', inject([AuthGuard], (service:AuthGuard) => {
    expect(service.canActivate()).toBeFalsy();
  }))
});
