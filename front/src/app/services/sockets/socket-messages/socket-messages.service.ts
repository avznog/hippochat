import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { SocketMessages } from 'src/app/providers/socket-messags.providers';
import { MessagesService } from '../../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class SocketMessagesService {

  constructor(
    private socket: SocketMessages,
    private readonly messagesService: MessagesService
  ) {
    this.updateMessages().subscribe();
  }

  updateMessages() {
    return new Observable<any>(() => {
      this.socket.on("send", (message: Message) => {
        this.messagesService.messages.push({ ...message, date: new Date(message.date) });
      })
    })
  }
}
