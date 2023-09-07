import { Component, OnInit, ViewChild } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { IonModal } from '@ionic/angular';
import * as moment from 'moment-timezone';
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
    public readonly daysPicturesService: DaysPicturesService
  ) { 
    this.publicProfileService.getMyMatesPublicProfile()
  }
  @ViewChild(IonModal) modal?: IonModal;
  presentingElement?: any;
  today: Date = new Date();
  date: Date = new Date();

  ngOnInit() {
    console.log(moment(this.today).tz("America/Los_Angeles"))
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
