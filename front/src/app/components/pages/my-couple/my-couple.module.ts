import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxColorsModule } from 'ngx-colors';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from 'src/app/app.module';
import { MyCouplePageRoutingModule } from './my-couple-routing.module';
import { MyCouplePage } from './my-couple.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxColorsModule,
    MyCouplePageRoutingModule,
    LottieModule.forRoot({player: playerFactory})
  ],
  declarations: [MyCouplePage]
})
export class MyCouplePageModule {}
