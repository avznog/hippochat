import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/auth.service";

export function LoggedGuardFn(): CanActivateFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    if (await authService.isLoggedIn()) {
      return true
    } else {
      router.navigate(['/login'])
      return false
    }
  }
}
