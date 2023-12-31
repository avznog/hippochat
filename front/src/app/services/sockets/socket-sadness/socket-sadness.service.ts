import { Injectable } from '@angular/core';
import { Sadness } from 'src/app/models/sadness.model';
import { SocketSadness } from 'src/app/providers/socket-sadness.provider';
import { PublicProfileService } from '../../publicProfile/public-profile.service';

@Injectable({
  providedIn: 'root'
})
export class SocketSadnessService {

  constructor(
    private socket: SocketSadness,
    private readonly publicProfileService: PublicProfileService
  ) {
    this.updateMateSadness();
  }


  // ? update sadness count if mate updates it
  updateMateSadness() {
    this.socket.on("create-mate-sadness", (sadness: Sadness) => {
      if (this.publicProfileService.myMatePublicProfile)
        this.publicProfileService.myMatePublicProfile = {
          ...this.publicProfileService.myMatePublicProfile,
          sadness: this.publicProfileService.myMatePublicProfile.sadness.concat([sadness])
        }
    })

  }

}
