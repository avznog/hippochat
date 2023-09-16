import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LottieModule } from 'ngx-lottie';
import { playerFactory } from 'src/app/app.module';
import { OneDayPictureComponent } from '../../album/one-day-picture/one-day-picture.component';
import { PicturesCalendarComponent } from '../../album/pictures-calendar/pictures-calendar.component';
import { MyAlbumPageRoutingModule } from './my-album-routing.module';
import { MyAlbumPage } from './my-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAlbumPageRoutingModule,
    LottieModule.forRoot({player: playerFactory})
  ],
  declarations: [MyAlbumPage, PicturesCalendarComponent, OneDayPictureComponent]
})
export class MyAlbumPageModule {}
