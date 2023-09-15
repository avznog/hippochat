import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationPageRoutingModule } from './conversation-routing.module';

import { ContactHeaderComponent } from '../../conversation/contact-header/contact-header.component';
import { ListMessagesComponent } from '../../conversation/list-messages/list-messages.component';
import { SendBarMessagesComponent } from '../../conversation/send-bar-messages/send-bar-messages.component';
import { ConversationPage } from './conversation.page';
import { OneMessageComponent } from '../../conversation/one-message/one-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactHeaderComponent,
    ListMessagesComponent,
    SendBarMessagesComponent,
    CommonModule,
    ConversationPageRoutingModule,
    OneMessageComponent
  ],
  declarations: [ConversationPage],
})
export class ConversationPageModule { }
