import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { Authentication } from './services/authentication.services'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcessoComponent } from './components/acesso/acesso.component';
import { BannerComponent } from './components/acesso/banner/banner.component';
import { LoginComponent } from './components/acesso/login/login.component';
import { CadastroComponent } from './components/acesso/cadastro/cadastro.component';
import { IncluirPublicacaoComponent } from './components/home/incluir-publicacao/incluir-publicacao.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [Authentication],
  bootstrap: [AppComponent]
})
export class AppModule { }
