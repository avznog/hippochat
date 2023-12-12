import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { MatesService } from "../services/mates/mates.service";

export function HasMateGuardFn(): CanActivateFn {
  return async () => {
    if (await inject(MatesService).amInCouple() === true) {
      inject(Router).navigate(['/home/conversation']);
      return false;
    } else {
      return true
    }
  }
}