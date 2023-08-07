import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private router: Router
  ) { }

  getHeaderTitle() : string {
    switch (this.router.url) {

      case '/login':
        return "Connexion"

      case '/register':
        return "Inscription"
      default:
        return ""
    }
  }

}
