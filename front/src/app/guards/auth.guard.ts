import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('loggedIn') === 'true') {
      // User is logged in, redirect to home page
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
