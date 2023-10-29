import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { Toast } from '@capacitor/toast';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateInvitationDto } from 'src/app/dto/invitations/create-invitation.dto';
import { Couple } from 'src/app/models/couple.model';
import { Invitation } from 'src/app/models/invitation.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService,
    private router: Router
  ) {
    this.refreshMyInvitations();
  }

  async refreshMyInvitations() {
    this.http.get<Invitation[]>(`invitations/my`).subscribe(invitations => {
      this.authService.currentUserSubject.next({ ...this.authService.currentUserSubject.getValue(), askedInvitations: invitations.filter(i => i.asker.id === this.authService.currentUserSubject.getValue().id), receivedInvitations: invitations.filter(i => i.receiver.id === this.authService.currentUserSubject.getValue().id) })
      console.log(this.authService.currentUserSubject.getValue())
    })
  }

  create(createInvitationDto: CreateInvitationDto) {
    try {
      this.http.post<Invitation>(`invitations`, createInvitationDto).subscribe(invitation => {
        this.authService.currentUserSubject.next({ ...this.authService.currentUserSubject.getValue(), askedInvitations: this.authService.currentUserSubject.getValue().askedInvitations.concat(invitation) })
        Toast.show({
          text: `Invitation de couple envoyée à ${createInvitationDto.receiver.firstname} ${createInvitationDto.receiver.lastname}`
        })
      })
    } catch (error) {

    }
  }

  acceptInvitation(id: string) {
    this.http.get<Couple>(`invitations/accept/${id}`).subscribe(() => {
      this.authService.refreshUser();
      Haptics.notification({
        type: NotificationType.Success
      })
      this.router.navigate(["/home/conversation"])
    });
  }
}
