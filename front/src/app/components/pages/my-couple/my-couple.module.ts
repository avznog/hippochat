import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MyCouplePageRoutingModule } from './my-couple-routing.module';
import { MyCouplePage } from './my-couple.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCouplePageRoutingModule
  ],
  declarations: [MyCouplePage]
})
export class MyCouplePageModule {}
