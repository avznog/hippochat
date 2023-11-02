import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
