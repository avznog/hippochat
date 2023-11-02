import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {

    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
