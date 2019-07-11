import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Authentication } from './authentication.services'

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authentication: Authentication){}

  canActivate(): boolean {
    return this.authentication.authenticated();
  }
}
