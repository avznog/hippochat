import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
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
  myProfilePicture?: string;
  myMatesProfilePicture?: string;

  constructor(
    private http: HttpClient
  ) {
   }

  async updateMyPublicProfile(updatePublicProfileDto: UpdatePublicProfileDto) {
    this.getProfilePictures()
    try {
      const deviceBattery = await Device.getBatteryInfo();
      if(deviceBattery.batteryLevel)
        updatePublicProfileDto = {
          ...updatePublicProfileDto,
          lastBatteryPercentage: deviceBattery.batteryLevel!.toString()
        }
      this.http.patch<PublicProfile>(`public-profile/my`, updatePublicProfileDto).subscribe(publicProfile => {
        this.myPublicProfile = publicProfile
      });

    } catch (error) {
      this.http.patch<PublicProfile>(`public-profile/my`, updatePublicProfileDto).subscribe(publicProfile => this.myPublicProfile = publicProfile);
      
    }
  }

  updateMyMatesPublicProfile(updatePublicProfileDto: UpdatePublicProfileDto) {
    this.getProfilePictures()
    this.updateMyPublicProfile({});
    this.http.patch<PublicProfile>(`public-profile/my-mate`, updatePublicProfileDto).subscribe(publicProfile => this.myMatePublicProfile = publicProfile);
  }

  async getMyPublicProfile() {
    this.myPublicProfile = {...(await lastValueFrom(this.http.get<PublicProfile>(`public-profile/my`))), profilePicture: this.myPublicProfile?.profilePicture ?? ''}
    this.getProfilePictures()
  }

  async getMyMatesPublicProfile() {
    this.myMatePublicProfile = {...await lastValueFrom(this.http.get<PublicProfile>(`public-profile/my-mate`)), profilePicture: this.myMatePublicProfile?.profilePicture ?? ''}
    this.getProfilePictures()
  }

  async updateMyBatteryPercentage() {
    const batteryLevel = (await Device.getBatteryInfo()).batteryLevel;
    if(batteryLevel) {
      this.updateMyPublicProfile({
        lastBatteryPercentage: batteryLevel.toString()
      })
    }
  }

  onChangePrimaryColor(color: string) {
    document.documentElement.style.setProperty("--ion-color-primary", color);
    document.documentElement.style.setProperty("--ion-color-primary-rgb",color);
    document.documentElement.style.setProperty("--ion-color-primary-shade",color);
    document.documentElement.style.setProperty("--ion-color-primary-tint",color);
  }

  async setPrimaryColorOnLogin() {
    await this.getMyPublicProfile();
    this.onChangePrimaryColor(this.myPublicProfile?.preferedColor!)
  }

  async updateProfilePicture(picture: Photo) {
    const formData = new FormData();
    formData.append("file", new File([new Blob([await (await fetch(picture.dataUrl!)).blob()])], `profile-picture-${new Date().toISOString()}.${picture.format}`, {
      lastModified: new Date().getTime(),
    }));
    this.http.post(`public-profile/update-profile-picture`, formData).subscribe(res => {
      this.getProfilePictures()
    })
  }

  getProfilePictures() {
      this.http.get(`public-profile/get-my-profile-picture`, {responseType: "blob"}).subscribe(async (file) => {
        this.myProfilePicture = await this.createProfilePicture(file);
      })
  }

  async createProfilePicture(file: Blob) {
   return URL.createObjectURL(new Blob([await file.arrayBuffer()]));
  }
}
