import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';
import { SocketMessagesService } from 'src/app/services/sockets/socket-messages/socket-messages.service';
import { SocketPublicProfileService } from 'src/app/services/sockets/socket-public-profile/socket-public-profile.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  constructor(
    public readonly publicProfileService: PublicProfileService,
    public messagesService: MessagesService,
    private socketMessagesService: SocketMessagesService, // ? leave for socket listener initialization
    private socketPublicProfileService: SocketPublicProfileService, // ? leave for socket listener initalization

  ) {

  }

  messages: { text: string }[] = [];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage });
      this.newMessage = '';
    }
  }

  ngOnInit() {
    this.messagesService.load()
  }

}
