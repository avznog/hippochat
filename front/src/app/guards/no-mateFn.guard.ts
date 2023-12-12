import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { MatesService } from "../services/mates/mates.service";

export function NoMateGuardFn(): CanActivateFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const matesService = inject(MatesService);
    const router = inject(Router);
    if (await matesService.amInCouple() === false) {
      router.navigate(['no-mate']);
      return false
    } else {
      if (state.url.startsWith('no-mate')) {
        router.navigate(['/home/conversation']);
        return false
      }
      return true;
    }
  }
}