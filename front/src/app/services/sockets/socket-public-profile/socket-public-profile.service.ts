import { Injectable } from '@angular/core';
import { PublicProfile } from 'src/app/models/public-profile.model';
import { SocketPublicProfile } from 'src/app/providers/socket-public-profile.provider';
import { PublicProfileService } from '../../publicProfile/public-profile.service';

@Injectable({
  providedIn: 'root'
})
export class SocketPublicProfileService {

  constructor(
    private socket: SocketPublicProfile,
    private readonly publicProfileService: PublicProfileService
  ) {
    this.updateMatePublicProfile();
    this.updateMyPublicProfile();
    this.updateMyProfilePicture();
  }

  updateMatePublicProfile() {
    this.socket.on("update-mate-public-profile", (publicProfile: PublicProfile) => {
      this.publicProfileService.myPublicProfile = publicProfile;
    })
  }

  updateMyPublicProfile() {
    this.socket.on("update-my-public-profile", (publicProfile: PublicProfile) => {
      this.publicProfileService.myMatePublicProfile = publicProfile;
    })
  }

  updateMyProfilePicture() {
    this.socket.on("update-profile-picture", () => {
      this.publicProfileService.getMatesSmallProfilePicture();
    })
  }
}
