import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { AlertController, IonModal, IonicModule, SearchbarChangeEventDetail } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { MatesService } from 'src/app/services/mates/mates.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class SettingsComponent {

  @Output() dismissLogoutEvent = new EventEmitter<boolean>();
  timezone: string = this.authService.currentUserSubject.getValue().timezone;
  allTimezones: string[] = moment.tz.names();
  @ViewChild(IonModal) modal?: IonModal;

  constructor(
    public readonly authService: AuthService,
    private readonly matesService: MatesService,
    private alertController: AlertController
  ) { }

  dismissLogout(value: boolean) {
    this.dismissLogoutEvent.emit(value);
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

  async deleteAccount() {
    const confirmAlert = await this.alertController.create({
      buttons: [
        {
          text: "Annuler",
          role: "destructive",
        },
        {
          text: "Supprimer mon compte",
          role: "Confirm",
          handler: async () => {
            await this.matesService.deleteAccount();
            this.authService.logout();
          }
        }
      ],
      message: "Je confirme vouloir supprimer mon compte.",
      subHeader: "Cette action est irreversible"
    });
    await confirmAlert.present();
  }
}
