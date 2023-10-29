import { Component } from '@angular/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { ActionSheetController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Mate } from 'src/app/models/mate.model';
import { InvitationsService } from 'src/app/services/invitations/invitations.service';
import { MatesService } from 'src/app/services/mates/mates.service';

@Component({
  selector: 'app-no-mate',
  templateUrl: './no-mate.component.html',
  styleUrls: ['./no-mate.component.scss'],
})
export class NoMateComponent {

  name: string = "";
  page: "search" | "invitations" = "search"
  loading: boolean = true;
  constructor(
    public readonly matesService: MatesService,
    private actionSheetController: ActionSheetController,
    public readonly authService: AuthService,
    private readonly invitationsService: InvitationsService
  ) {
    this.matesService.findAllSingle(this.name, true)
      .then(() => this.loading = false)
  }

  async loadSingleMates(reset: boolean) {
    this.loading = true;
    await this.matesService.findAllSingle(this.name, reset)
    if (this.matesService.singleMates.length <= 0) {
      Haptics.notification({
        type: NotificationType.Error
      })
    } else {
      Haptics.notification({
        type: NotificationType.Success
      })
    }
    this.loading = false;
  }

  async onIonInfinite(e: any) {
    setTimeout(() => {
      (e as InfiniteScrollCustomEvent).target.complete();
      this.loadSingleMates(false)

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
    console.log("denied : " + id)
  }
}
