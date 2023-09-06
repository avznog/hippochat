import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { MyAlbumPageRoutingModule } from './my-album-routing.module';
import { MyAlbumPage } from './my-album.page';
import { SettingsComponent } from '../../settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAlbumPageRoutingModule,
    SettingsComponent
  ],
  declarations: [MyAlbumPage]
})
export class MyAlbumPageModule {}
