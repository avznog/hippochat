import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PublicProfileService } from '../../publicProfile/public-profile.service';
import { Sadness } from 'src/app/models/sadness.model';
import { Observable, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketSadnessService {

  constructor(
    private socket: Socket,
    private readonly publicProfileService: PublicProfileService
  ) {
    this.getSadness().subscribe()
  }


  // ? update sadness count if mate updates it
  getSadness(): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      this.socket.on("create-mate-sadness", (sadness: Sadness) => {
        if (this.publicProfileService.myMatePublicProfile)
          this.publicProfileService.myMatePublicProfile = {
            ...this.publicProfileService.myMatePublicProfile,
            sadness: this.publicProfileService.myMatePublicProfile.sadness.concat([sadness])
          }
      })
    })

  }

}
