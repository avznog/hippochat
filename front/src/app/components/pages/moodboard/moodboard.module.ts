import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EmojisCalendarComponent } from '../../moodboard/emojis-calendar/emojis-calendar.component';
import { MoodboardMonthComponent } from '../../moodboard/moodboard-month/moodboard-month.component';
import { MoodboardTodayComponent } from '../../moodboard/moodboard-today/moodboard-today.component';
import { MoodboardPageRoutingModule } from './moodboard-routing.module';
import { MoodboardPage } from './moodboard.page';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from 'src/app/app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodboardPageRoutingModule,
    LottieModule.forRoot({player: playerFactory})
  ],
  declarations: [MoodboardPage, MoodboardTodayComponent, MoodboardMonthComponent, EmojisCalendarComponent]
})
export class MoodboardPageModule {}
