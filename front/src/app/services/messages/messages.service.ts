import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMessageDto } from 'src/app/dto/messages/create-message.dto';
import { Message } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: Message[] = [];
  scroll: any;
  constructor(
    private http: HttpClient
  ) { }

  load(event?: any) {
    this.http.get<Message[]>(`messages/load/${!this.messages || this.messages.length === 0 ? 'false' : this.messages[0].date}`).subscribe(messages => {
      messages.forEach(message => {
        this.messages.push({
          ...message,
          date: new Date(message.date)
        })
      });
      this.sortMessages();
      event && event.target.complete();
    })
  }

  create(createMessageDto: CreateMessageDto) {
    this.http.post<Message>(`messages/create`, createMessageDto).subscribe(message => {
      this.messages.push({
        ...message,
        date: new Date(message.date)
      });
      this.sortMessages();
    })
  }

  sortMessages() { this.messages = this.messages.sort((a, b) => (a.date.getTime() - b.date.getTime())) };

}
