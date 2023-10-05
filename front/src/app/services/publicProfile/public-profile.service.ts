import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
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
    this.getMySmallProfilePicture()
    try {
      updatePublicProfileDto = {
        ...updatePublicProfileDto,
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
    this.getMySmallProfilePicture()
  }

  async getMyMatesPublicProfile() {
    this.myMatePublicProfile = { ...await lastValueFrom(this.http.get<PublicProfile>(`public-profile/my-mate`)), profilePicture: this.myMatePublicProfile?.profilePicture ?? '' }
    try {
      this.getMatesSmallProfilePicture()
    } catch (error) {
      console.log("error")
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
      this.getMySmallProfilePicture();
    })
  }

  getMyProfilePictures() {
    this.http.get<string>(`public-profile/get-my-profile-picture`).subscribe(url => {
      if (!url) {
        this.myProfilePicture = this.myPublicProfile?.sex === Sex.MALE ? '../../../assets/couple-icons/boy-iso-color.webp' : '../../../assets/couple-icons/girl-iso-color.webp'
        Haptics.notification({
          type: NotificationType.Error
        })
      } else {
        this.myProfilePicture = url;
        Haptics.notification({
          type: NotificationType.Success
        })
      }
    })
  }

  getMySmallProfilePicture() {
    this.loadingMyProfilePicture = true;
    this.http.get<string>(`public-profile/get-my-small-profile-picture`).subscribe(url => {
      if (!url) {
        this.myProfilePicture = this.myPublicProfile?.sex === Sex.MALE ? '../../../assets/couple-icons/boy-iso-color.webp' : '../../../assets/couple-icons/girl-iso-color.webp'
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
      this.getMyProfilePictures()
    })
  }

  getMatesSmallProfilePicture() {
    this.loadingMatesProfilePicture = true;
    this.http.get<string>(`public-profile/get-mate-small-profile-picture`).subscribe(url => {
      if (!url) {
        this.myMatesProfilePicture = this.myMatePublicProfile?.sex === Sex.MALE ? '../../../assets/couple-icons/boy-iso-color.webp' : '../../../assets/couple-icons/girl-iso-color.webp'
        Haptics.notification({
          type: NotificationType.Error
        })
      } else {
        this.myMatesProfilePicture = url;
        Haptics.notification({
          type: NotificationType.Success
        })
      }
      this.loadingMatesProfilePicture = false;
      this.getMyMatesProfilePicture();
    })
  }

  getMyMatesProfilePicture() {
    this.http.get<string>(`public-profile/get-mate-profile-picture`).subscribe(url => {
      if (!url) {
        this.myMatesProfilePicture = this.myMatePublicProfile?.sex === Sex.MALE ? '../../../assets/couple-icons/boy-iso-color-reversed.webp' : '../../../assets/couple-icons/girl-iso-color-reversed.webp'
      } else {
        this.myMatesProfilePicture = url;
      }
    })
  }

  changeMyLocation(location: string) {
    const updatePublicProfileDto: UpdatePublicProfileDto = {
      lastLocation: location
    };
    this.http.patch(`public-profile/my`, updatePublicProfileDto).subscribe()
  }
}
