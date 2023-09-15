import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-send-bar-messages',
  templateUrl: './send-bar-messages.component.html',
  styleUrls: ['./send-bar-messages.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  standalone: true
})
export class SendBarMessagesComponent implements OnInit {

  message: string = "";
  constructor(
    private readonly messageService: MessagesService
  ) { }

  ngOnInit() {
  }

  onSendMessage() {
    this.messageService.create({
      value: this.message
    });
    this.message = "";
    this.messageService.scroll.nativeElement.scrollTop = this.messageService.scroll.nativeElement.scrollHeight
  }

}
