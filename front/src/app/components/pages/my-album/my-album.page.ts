import { Component, OnInit, ViewChild } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { IonModal } from '@ionic/angular';
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
    public readonly authService: AuthService
  ) { 
    this.publicProfileService.getMyMatesPublicProfile()
  }

  @ViewChild(IonModal) modal?: IonModal;
  presentingElement?: any;
  today: Date = new Date()
  date: Date = new Date();

  ngOnInit() {
    this.presentingElement = document.querySelector('.content');

  }

  onClickSettings() {
    Haptics.impact({
      style: ImpactStyle.Heavy
    });
  }

  onChangeDate(event: any) {
    this.date = new Date(event.detail.value);
  }

}
