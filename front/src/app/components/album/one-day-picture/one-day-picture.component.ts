import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { DaysPicturesService } from 'src/app/services/daysPictures/days-pictures.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';

@Component({
  selector: 'app-one-day-picture',
  templateUrl: './one-day-picture.component.html',
  styleUrls: ['./one-day-picture.component.scss'],
})
export class OneDayPictureComponent  implements OnInit {

  constructor(
    private readonly modalController: ModalController,
    public readonly daysPictureService: DaysPicturesService,
    public readonly authService: AuthService,
    public readonly publicProfileService: PublicProfileService
  ) { }

  ngOnInit() {
  }
  async onDismiss() {
    const modal = await this.modalController.getTop()
    modal?.dismiss()
  }

}
