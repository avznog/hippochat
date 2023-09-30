import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      if ((await Preferences.get({ key: "loggedIn" })).value === 'true') {
        this.router.navigate(['/home']);
        return false
      }
      return true
    } else {
      if (localStorage.getItem('loggedIn') === 'true') {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }
  }
}
