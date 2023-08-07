import { Component } from '@angular/core';
import { HeaderService } from './services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public readonly headerService: HeaderService,
    public readonly router: Router
  ) {}
}
