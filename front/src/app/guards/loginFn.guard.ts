import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export function LoginGuardFn(): CanActivateFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (await authService.isLoggedIn()) {
      router.navigate(['/home']);
      return false
    } else {
      return true;
    }
  }
}
