import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccessComponent } from './components/access/access.component';

import {AuthGuard} from './services/auth-guard.service'


const routes: Routes = [
  {path: '', component: AccessComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
