import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMatePageRoutingModule } from './my-mate-routing.module';

import { MyMatePage } from './my-mate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMatePageRoutingModule
  ],
  declarations: [MyMatePage]
})
export class MyMatePageModule {}
