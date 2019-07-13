import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AuthenticationService } from './services/authentication.service'
import { AuthGuard } from './services/auth-guard.service'
import { DbService } from './services/db.service'
import { ProgressService } from './services/progress.service'
import { ToastrModule } from 'ngx-toastr'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/access/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AccessComponent } from './components/access/access.component';
import { RegisterComponent } from './components/access/register/register.component';
import { IncludePublicationsComponent } from './components/home/include-publications/include-publications.component';
import { PublicationsComponent } from './components/home/publications/publications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AccessComponent,
    RegisterComponent,
    IncludePublicationsComponent,
    PublicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthenticationService, AuthGuard, DbService, ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
