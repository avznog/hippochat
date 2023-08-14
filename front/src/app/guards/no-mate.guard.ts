import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { MatesService } from "../services/mates/mates.service";

@Injectable()
export class NoMateGuard implements CanActivate {

  constructor(
    private readonly matesService: MatesService,
    private router: Router,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(await this.matesService.amInCouple() === false) {
      this.router.navigate(["no-mate"])
      return false;
    } else {
      if(state.url.startsWith("no-mate")) {
        console.log("lkerez")
        this.router.navigate(["/home/conversation"])
        return false
      }
      return true
    }
    
  }
}