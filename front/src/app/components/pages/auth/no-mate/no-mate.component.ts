import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { ActionSheetController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Sex } from 'src/app/constants/sex.type';
import { Mate } from 'src/app/models/mate.model';
import { CouplesService } from 'src/app/services/couples/couples.service';
import { MatesService } from 'src/app/services/mates/mates.service';

@Component({
  selector: 'app-no-mate',
  templateUrl: './no-mate.component.html',
  styleUrls: ['./no-mate.component.scss'],
})
export class NoMateComponent  implements OnInit {

  gender: string = "male";
  name: string = "";
  loading: boolean = true;
  constructor(
    public readonly matesService: MatesService,
    private actionSheetController: ActionSheetController,
    private readonly couplesService: CouplesService,
    public readonly authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.matesService.findAllSingle(this.gender, this.name, true)
      .then(() => this.loading = false)
  }

  async loadSingleMates(reset: boolean) {
    this.loading = true;
    await this.matesService.findAllSingle(this.gender, this.name, reset)
    if(this.matesService.singleMates.length <= 0) {
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

  onChangeGender() {
    Haptics.impact({
      style: ImpactStyle.Light
    })
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
      header: `Je choisis ${mate.firstname} ${mate.lastname} comme ${mate.publicProfile.sex === Sex.MALE ? 'mon' : 'ma'} mate ?`,
      mode: "ios",
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            Haptics.impact({
              style: ImpactStyle.Light
            });
            this.couplesService.create({
              matesIds: [this.authService.currentUserSubject.getValue().id, mate.id]
            }).then(() => {
              this.authService.refreshUser();
              Haptics.notification({
                type: NotificationType.Success
              })
              this.router.navigate(["/home/conversation"])
            });
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
}
