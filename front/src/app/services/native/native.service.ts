import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { PositionStackService } from '../apis/position-stack/position-stack.service';
import { PublicProfileService } from '../publicProfile/public-profile.service';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  async myBattery() {
    const batteryInfo = await Device.getBatteryInfo();
    if(batteryInfo)
      return batteryInfo.batteryLevel!.toString()
    else
      return null
  };
  location: string | null = null;

  async getLocation() {
      const geolocation = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        maximumAge: 300000
      })
    if(geolocation) {
      this.location = await this.positionStackService.getAddress({latitude: geolocation.coords.latitude.toString(), longitude: geolocation.coords.longitude.toString()})
      this.publicProfileService.changeMyLocation(this.location);
    }
    else
      this.location = null
    
  }

  constructor(
    private readonly positionStackService: PositionStackService,
    private readonly publicProfileService: PublicProfileService
  ) { }
}
