import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { Mate } from 'src/app/models/mate.model';
import { SocketBattery } from 'src/app/providers/socket-battery.provider';
import { PublicProfileService } from '../../publicProfile/public-profile.service';

@Injectable({
  providedIn: 'root'
})
export class SocketBatteryService {

  constructor(
    private socketBattery: SocketBattery,
    private http: HttpClient,
    private publicProfileService: PublicProfileService
  ) {
    this.listenBatteryChange();
    this.listenMateBatteryChange();
  }

  listenBatteryChange() {
    this.socketBattery.on("ask-battery", () => {
      this.sendBatteryLevel()
    })
  }

  listenMateBatteryChange() {
    this.socketBattery.on("new-battery-level", (batteryLevel: number) => {
      console.log(batteryLevel)
      this.publicProfileService.myMatePublicProfile && (this.publicProfileService.myMatePublicProfile!.lastBatteryPercentage = batteryLevel.toString())
    })
  }

  async sendBatteryLevel() {
    Device.getBatteryInfo()
      .then(battery => {
        this.http.patch<Mate>(`public-profile/update-my-battery`, battery).subscribe()
      })
      .catch(error => {
      });
  }
}
