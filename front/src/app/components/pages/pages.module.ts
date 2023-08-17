import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { CalendarsPageModule } from './calendars/calendars.module';
import { ConversationPageModule } from './conversation/conversation.module';
import { MyCouplePageModule } from './my-couple/my-couple.module';
import { MyProfilePageModule } from './my-profile/my-profile.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarsPageModule,
    MyCouplePageModule,
    MyProfilePageModule,
    ConversationPageModule,
    AuthModule,
  ]
})
export class PagesModule { }
