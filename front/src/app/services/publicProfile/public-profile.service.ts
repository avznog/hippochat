import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { lastValueFrom } from 'rxjs';
import { Sex } from 'src/app/constants/sex.type';
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
  loadingMyProfilePicture: boolean = false;
  loadingMatesProfilePicture: boolean = false;

  constructor(
    private http: HttpClient,
  ) {
  }

  async updateMyPublicProfile(updatePublicProfileDto: UpdatePublicProfileDto) {
    this.getMyProfilePictures()
    try {
      const deviceBattery = await Device.getBatteryInfo();
      if (deviceBattery.batteryLevel)
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
    this.http.patch<PublicProfile>(`public-profile/my-mate`, updatePublicProfileDto).subscribe(publicProfile => this.myMatePublicProfile = publicProfile);
  }

  async getMyPublicProfile() {
    this.myPublicProfile = { ...(await lastValueFrom(this.http.get<PublicProfile>(`public-profile/my`))), profilePicture: this.myPublicProfile?.profilePicture ?? '' }
    this.getMyProfilePictures()
  }

  async getMyMatesPublicProfile() {
    this.myMatePublicProfile = { ...await lastValueFrom(this.http.get<PublicProfile>(`public-profile/my-mate`)), profilePicture: this.myMatePublicProfile?.profilePicture ?? '' }
    try {
      this.getMyMatesProfilePicture()
    } catch (error) {
      console.log("error")
    }
  }

  async updateMyBatteryPercentage() {
    const batteryLevel = (await Device.getBatteryInfo()).batteryLevel;
    if (batteryLevel) {
      this.updateMyPublicProfile({
        lastBatteryPercentage: batteryLevel.toString()
      })
    }
  }

  onChangePrimaryColor(color: string) {
    document.documentElement.style.setProperty("--ion-color-primary", color);
    document.documentElement.style.setProperty("--ion-color-primary-rgb", color);
    document.documentElement.style.setProperty("--ion-color-primary-shade", color);
    document.documentElement.style.setProperty("--ion-color-primary-tint", color);
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
      this.getMyProfilePictures();
    })
  }

  getMyProfilePictures() {
    this.loadingMyProfilePicture = true;
    this.http.get<string>(`public-profile/get-my-profile-picture`).subscribe(url => {
      if (!url) {
        this.myProfilePicture = this.myPublicProfile?.sex === Sex.MALE ? '../../../assets/couple-icons/boy-iso-color.png' : '../../../assets/couple-icons/girl-iso-color.png'
        Haptics.notification({
          type: NotificationType.Error
        })
      } else {
        this.myProfilePicture = url;
        Haptics.notification({
          type: NotificationType.Success
        })
      }
      this.loadingMyProfilePicture = false;
    })
  }

  getMyMatesProfilePicture() {
    this.loadingMatesProfilePicture = true;
    this.http.get<string>(`public-profile/get-mate-profile-picture`).subscribe(url => {
      if (!url) {
        this.myMatesProfilePicture = this.myMatePublicProfile?.sex === Sex.MALE ? '../../../assets/couple-icons/boy-iso-color-reversed.png' : '../../../assets/couple-icons/girl-iso-color-reversed.png'
      } else {
        this.myMatesProfilePicture = url;
      }
      this.loadingMatesProfilePicture = false;
    })
  }
}
