import { Component } from '@angular/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { ActionSheetController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Invitation } from 'src/app/models/invitation.model';
import { Mate } from 'src/app/models/mate.model';
import { InvitationsService } from 'src/app/services/invitations/invitations.service';
import { NoMatesService } from 'src/app/services/no-mates/no-mates.service';
import { SocketInvitationService } from 'src/app/services/sockets/socket-invitation/socket-invitation.service';

@Component({
  selector: 'app-no-mate',
  templateUrl: './no-mate.component.html',
  styleUrls: ['./no-mate.component.scss'],
})
export class NoMateComponent {

  name: string = "";
  page: "search" | "invitations" = "search";
  pageCount: number = 0;

  constructor(
    private actionSheetController: ActionSheetController,
    public readonly authService: AuthService,
    public readonly noMatesService: NoMatesService,
    private readonly invitationsService: InvitationsService,
    private readonly socketInvitationService: SocketInvitationService // ? leave here for socket connection
  ) {
    this.noMatesService.updateSingleMates({ name: this.name, page: this.pageCount });
  }

  async onIonInfinite(e: any) {
    setTimeout(() => {
      (e as InfiniteScrollCustomEvent).target.complete();
      this.noMatesService.updateSingleMates({ name: this.name, page: this.pageCount + 1 });
    }, 500);
  }

  async onSelectItem(mate: Mate) {
    Haptics.impact({
      style: ImpactStyle.Medium
    });
    const actionSheet = await this.actionSheetController.create({
      animated: true,
      backdropDismiss: true,
      keyboardClose: true,
      header: `J'envoie une invitation de couple à ${mate.firstname} ${mate.lastname} ?`,
      mode: "ios",
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            Haptics.impact({
              style: ImpactStyle.Light
            });
            this.invitationsService.create({
              receiver: mate
            })
          }
        },
        {
          text: 'Annuler',
          role: 'destructive',
          data: {
            action: 'cancel'
          },
          handler: () => {
            Haptics.notification({
              type: NotificationType.Error
            })
          }
        }
      ]
    });
    await actionSheet.present();
  }

  onAcceptInvitation(id: string) {
    this.invitationsService.acceptInvitation(id);
  }

  onDenyInvitation(id: string) {
    this.invitationsService.denyInvitation(id)
  }

  isAlreadyAsked(invitations: Invitation[], id: string): boolean {
    if (invitations.find(el => el.receiver.id === id)) {
      return true
    } else return false
  }
}
