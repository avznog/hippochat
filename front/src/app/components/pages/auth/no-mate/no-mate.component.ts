import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.loading = false;
  }

  async onIonInfinite(e: any) {
    setTimeout(() => {
      (e as InfiniteScrollCustomEvent).target.complete();
      this.loadSingleMates(false)

    }, 500);
  }

  async onSelectItem(mate: Mate) {
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
            this.couplesService.create({
              matesIds: [this.authService.currentUserSubject.getValue().id, mate.id]
            }).then(() => {
              this.authService.refreshUser();
              this.router.navigate(["/home/conversation"])
            })
          }
        },
        {
          text: 'Annuler',
          role: 'destructive',
          data: {
            action: 'cancel'
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
