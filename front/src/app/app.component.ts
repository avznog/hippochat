import { Component } from '@angular/core';
import { PublicProfileService } from './services/publicProfile/public-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly publicProfileService: PublicProfileService,
    ) { 
      this.publicProfileService.setPrimaryColorOnLogin();
    }
}
