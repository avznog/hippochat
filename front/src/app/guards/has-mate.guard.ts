import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MatesService } from "../services/mates/mates.service";

@Injectable()
export class HasMateGuard implements CanActivate {

  constructor(
    private readonly matesService: MatesService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(await this.matesService.amInCouple() === true) {
      this.router.navigate(["/home/conversation"])
      return false;
    } else {
      return true
    }
  }
}