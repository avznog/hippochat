import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MoodboardPageRoutingModule } from './moodboard-routing.module';
import { MoodboardPage } from './moodboard.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodboardPageRoutingModule
  ],
  declarations: [MoodboardPage]
})
export class MoodboardPageModule {}
