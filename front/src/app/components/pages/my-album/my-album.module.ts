import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { MyAlbumPageRoutingModule } from './my-album-routing.module';
import { MyAlbumPage } from './my-album.page';
import { SettingsComponent } from '../../settings/settings.component';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from 'src/app/app.module';
import { PicturesCalendarComponent } from '../../album/pictures-calendar/pictures-calendar.component';
import { OneDayPictureComponent } from '../../album/one-day-picture/one-day-picture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAlbumPageRoutingModule,
    SettingsComponent,
    LottieModule.forRoot({player: playerFactory})
  ],
  declarations: [MyAlbumPage, PicturesCalendarComponent, OneDayPictureComponent]
})
export class MyAlbumPageModule {}
