import { Injectable } from '@angular/core';
import { SocketPublicProfile } from 'src/app/providers/socket-public-profile.provider';

@Injectable({
  providedIn: 'root'
})
export class SocketPublicProfileService {

  constructor(
    private socket: SocketPublicProfile
  ) { }

  updateMateEmoji() {
  }
}
