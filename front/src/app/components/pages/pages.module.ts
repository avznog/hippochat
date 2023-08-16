import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { CalendarsPageModule } from './calendars/calendars.module';
import { ConversationPageModule } from './conversation/conversation.module';
import { MyMatePageModule } from './my-mate/my-mate.module';
import { MyProfilePageModule } from './my-profile/my-profile.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarsPageModule,
    MyMatePageModule,
    MyProfilePageModule,
    ConversationPageModule,
    AuthModule,
  ]
})
export class PagesModule { }
