import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxColorsModule } from 'ngx-colors';
import { MyCouplePageRoutingModule } from './my-couple-routing.module';
import { MyCouplePage } from './my-couple.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxColorsModule,
    MyCouplePageRoutingModule,
  ],
  declarations: [MyCouplePage]
})
export class MyCouplePageModule {}
