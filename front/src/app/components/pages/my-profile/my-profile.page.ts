import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { MatesService } from 'src/app/services/mates/mates.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  constructor(
    public authService: AuthService,
    private readonly matesService: MatesService
  ) { }

  timezone: string = this.authService.currentUserSubject.getValue().timezone;
  allTimezones: string[] = moment.tz.names();

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  onChangeTimezone(e: any) {
    this.matesService.updateMe({
      timezone: e.detail.value
    })
  }
}
