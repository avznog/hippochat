import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.updateMatePublicProfile().subscribe();
    this.updateMyPublicProfile().subscribe();
   }

  updateMatePublicProfile() {
    return new Observable<any>(() => {
      this.socket.on("update-mate-public-profile", (publicProfile: PublicProfile) => {
        this.publicProfileService.myPublicProfile = publicProfile;
      })
    })
  }

  updateMyPublicProfile() {
    return new Observable<any>(() => {
      this.socket.on("update-my-public-profile", (publicProfile: PublicProfile) => {
        this.publicProfileService.myMatePublicProfile = publicProfile;
      })
    })
  }
}