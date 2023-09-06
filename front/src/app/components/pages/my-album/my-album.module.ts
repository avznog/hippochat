import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { MyAlbumPage } from './my-album.page';
import { MyAlbumPageRoutingModule } from './my-album-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAlbumPageRoutingModule
  ],
  declarations: [MyAlbumPage]
})
export class MyAlbumPageModule {}
