import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarsPageModule } from './calendars/calendars.module';
import { MyMatePageModule } from './my-mate/my-mate.module';
import { MyProfilePageModule } from './my-profile/my-profile.module';
import { ConversationPageModule } from './conversation/conversation.module';
import { RegisterModule } from './auth/register/register.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarsPageModule,
    MyMatePageModule,
    MyProfilePageModule,
    ConversationPageModule,
    RegisterModule
  ]
})
export class PagesModule { }
