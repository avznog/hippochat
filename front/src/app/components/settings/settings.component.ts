import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { IonModal, IonicModule } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { CouplesService } from 'src/app/services/couples/couples.service';
import { MatesService } from 'src/app/services/mates/mates.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class SettingsComponent implements OnInit {

  @Output() dismissLogoutEvent = new EventEmitter<boolean>();
  timezone: string = this.authService.currentUserSubject.getValue().timezone;
  allTimezones: string[] = moment.tz.names();

  @ViewChild(IonModal) modal?: IonModal;
  constructor(
    public readonly authService: AuthService,
    private readonly matesService: MatesService,
    private readonly couplesService: CouplesService
  ) { }

  dismissLogout(value: boolean) {
    this.dismissLogoutEvent.emit(value);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  onChangeTimezone(timezone: string) {
    this.matesService.updateMe({
      timezone: timezone
    }).then(() => {
      this.modal?.dismiss();
      Toast.show({
        text: "Fuseau horaire changé à " + timezone
      })
    })
  }

  getSpecialTime(timezone: string) {
    return moment().tz(timezone).toDate()
  }

  onSearchTimezone(event: any) {
    const timezonesFiltered = this.allTimezones.filter(zone => zone.toLowerCase().includes(event.detail.value.toLowerCase()));
    if (timezonesFiltered.length > 0 || event.detail.value === '') {
      this.allTimezones = timezonesFiltered;
    } else {
      Toast.show({
        text: "Aucun fuseau horaire correspondant",
        position: "top"
      });
      this.allTimezones = moment.tz.names();
    }
  }

  cancelTimezone() {
    this.allTimezones = moment.tz.names()
    this.modal?.dismiss();
  }

  onBecomeSingle() {
    this.couplesService.becomeSingle();
  }

}
