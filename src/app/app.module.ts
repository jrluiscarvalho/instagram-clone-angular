import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AuthenticationService } from './services/authentication.service'
import { AuthGuard } from './services/auth-guard.service'
import { DbService } from './services/db.service'
import { ProgressService } from './services/progress.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcessoComponent } from './components/acesso/acesso.component';
import { BannerComponent } from './components/acesso/banner/banner.component';
import { LoginComponent } from './components/acesso/login/login.component';
import { CadastroComponent } from './components/acesso/cadastro/cadastro.component';
import { IncluirPublicacaoComponent } from './components/home/incluir-publicacao/incluir-publicacao.component';
import { HomeComponent } from './components/home/home.component';
import { PublicacoesComponent } from './components/home/publicacoes/publicacoes.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    IncluirPublicacaoComponent,
    HomeComponent,
    PublicacoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, AuthGuard, DbService, ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
