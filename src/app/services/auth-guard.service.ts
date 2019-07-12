import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authentication: AuthenticationService){}

  canActivate(): boolean {
    return this.authentication.authenticated();
  }
}
