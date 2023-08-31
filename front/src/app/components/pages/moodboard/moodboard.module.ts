import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MoodboardPageRoutingModule } from './moodboard-routing.module';
import { MoodboardPage } from './moodboard.page';
import { MoodboardTodayComponent } from '../../moodboard/moodboard-today/moodboard-today.component';
import { MoodboardMonthComponent } from '../../moodboard/moodboard-month/moodboard-month.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodboardPageRoutingModule,
  ],
  declarations: [MoodboardPage, MoodboardTodayComponent, MoodboardMonthComponent]
})
export class MoodboardPageModule {}
