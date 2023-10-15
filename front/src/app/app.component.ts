import { Component } from '@angular/core';
import { PublicProfileService } from './services/publicProfile/public-profile.service';
import { SocketBatteryService } from './services/sockets/socket-battery/socket-battery.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly publicProfileService: PublicProfileService,
    private readonly socketBatteryService: SocketBatteryService
  ) {
    this.publicProfileService.setPrimaryColorOnLogin();
  }
}
