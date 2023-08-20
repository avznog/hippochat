import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { lastValueFrom } from 'rxjs';
import { UpdatePublicProfileDto } from 'src/app/dto/publicProfile/update-public-profile.dto';
import { PublicProfile } from 'src/app/models/public-profile.model';

@Injectable({
  providedIn: 'root'
})
export class PublicProfileService {

  myPublicProfile?: PublicProfile;
  myMatePublicProfile?: PublicProfile;

  constructor(
    private http: HttpClient
  ) { }

  updateMyPublicProfile(updatePublicProfileDto: UpdatePublicProfileDto) {
    this.http.patch<PublicProfile>(`public-profile/my`, updatePublicProfileDto).subscribe(publicProfile => this.myPublicProfile = publicProfile);
  }

  updateMyMatesPublicProfile(updatePublicProfileDto: UpdatePublicProfileDto) {
    this.http.patch<PublicProfile>(`public-profile/my-mate`, updatePublicProfileDto).subscribe(publicProfile => this.myMatePublicProfile = publicProfile);
  }

  async getMyPublicProfile() {
    this.myPublicProfile = await lastValueFrom(this.http.get<PublicProfile>(`public-profile/my`))
  }

  async getMyMatesPublicProfile() {
    this.myMatePublicProfile = await lastValueFrom(this.http.get<PublicProfile>(`public-profile/my-mate`))
  }

  async updateMyBatteryPercentage() {
    const batteryLevel = (await Device.getBatteryInfo()).batteryLevel;
    if(batteryLevel) {
      this.updateMyPublicProfile({
        lastBatteryPercentage: batteryLevel.toString()
      })
    }
  }
}
