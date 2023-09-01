import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EmojisCalendarComponent } from '../../moodboard/emojis-calendar/emojis-calendar.component';
import { MoodboardMonthComponent } from '../../moodboard/moodboard-month/moodboard-month.component';
import { MoodboardTodayComponent } from '../../moodboard/moodboard-today/moodboard-today.component';
import { MoodboardPageRoutingModule } from './moodboard-routing.module';
import { MoodboardPage } from './moodboard.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodboardPageRoutingModule,
  ],
  declarations: [MoodboardPage, MoodboardTodayComponent, MoodboardMonthComponent, EmojisCalendarComponent]
})
export class MoodboardPageModule {}
