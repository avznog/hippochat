import { Component, OnInit, ViewChild } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { IonModal } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { DaysPicturesService } from 'src/app/services/daysPictures/days-pictures.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-album.page.html',
  styleUrls: ['./my-album.page.scss'],
})
export class MyAlbumPage implements OnInit {

  constructor(
    public readonly publicProfileService: PublicProfileService,
    public readonly daysPicturesService: DaysPicturesService,
    private readonly authService: AuthService
  ) { 
    this.publicProfileService.getMyMatesPublicProfile()
  }
  @ViewChild(IonModal) modal?: IonModal;
  presentingElement?: any;
  today: Date = moment(new Date()).tz(this.authService.currentUserSubject.getValue().timezone).toDate();
  date: Date = moment(new Date()).tz(this.authService.currentUserSubject.getValue().timezone).toDate();

  ngOnInit() {
    this.presentingElement = document.querySelector('.content');
    this.daysPicturesService.loadAlbumPictures(this.date);

  }

  onClickSettings() {
    Haptics.impact({
      style: ImpactStyle.Heavy
    });
  }

  onDateChange(event: any) {
    this.date = event.detail.value;
    this.daysPicturesService.loadAlbumPictures(event.detail.value);
  }

}
