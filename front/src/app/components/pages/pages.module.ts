import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { MoodboardPageModule } from './moodboard/moodboard.module';
import { ConversationPageModule } from './conversation/conversation.module';
import { MyCouplePageModule } from './my-couple/my-couple.module';
import { MyAlbumPageModule } from './my-album/my-album.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MoodboardPageModule,
    MyCouplePageModule,
    MyAlbumPageModule,
    ConversationPageModule,
    AuthModule,
  ]
})
export class PagesModule { }
