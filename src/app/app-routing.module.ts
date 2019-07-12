import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoComponent } from './components/acesso/acesso.component';
import { HomeComponent } from './components/home/home.component';

import {AuthGuard} from './services/auth-guard.service'

const routes: Routes = [
  {path: '', component: AcessoComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
