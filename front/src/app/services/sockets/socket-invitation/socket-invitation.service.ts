import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Invitation } from 'src/app/models/invitation.model';
import { SocketInvitation } from 'src/app/providers/socket-invitation.provider';
import { MatesService } from '../../mates/mates.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketInvitationService {

  constructor(
    private socketInvitation: SocketInvitation,
    private authService: AuthService,
    private readonly matesService: MatesService,
    private router: Router
  ) {
    this.receiveNewInvitation();
    this.deniedInvitation();
    this.acceptedInvitation();
  }

  receiveNewInvitation() {
    this.socketInvitation.on("new-invitation", (invitation: Invitation) => {
      this.authService.currentUserSubject.next({ ...this.authService.currentUserSubject.getValue(), receivedInvitations: [invitation].concat(this.authService.currentUserSubject.getValue().receivedInvitations) })
    })
  }

  deniedInvitation() {
    this.socketInvitation.on("denied-invitation", (invitation: Invitation) => {
      this.authService.currentUserSubject.next({ ...this.authService.currentUserSubject.getValue(), askedInvitations: this.authService.currentUserSubject.getValue().askedInvitations.filter(inv => inv.id !== invitation.id) })
    })
  }

  acceptedInvitation() {
    this.socketInvitation.on("accepted-invitation", async (invitation: Invitation) => {
      console.log("accepted invite")
      this.authService.currentUserSubject.next(await this.matesService.me())
      this.router.navigate(['/home']);
    })
  }
}
