import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loginComponent = LoginComponent;
  navbarComponent = NavbarComponent;
  constructor(
    public readonly headerService: HeaderService,
    public readonly router: Router,
    ) {}
}
