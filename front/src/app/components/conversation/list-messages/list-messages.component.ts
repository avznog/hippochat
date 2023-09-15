import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { OneMessageComponent } from '../one-message/one-message.component';

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.scss'],
  imports: [OneMessageComponent, IonicModule, CommonModule],
  standalone: true
})
export class ListMessagesComponent implements OnInit {

  constructor(
    public readonly messagesService: MessagesService,
  ) {
  }

  @ViewChild('scroll', { static: true }) scroll: any;

  ngOnInit(): void {
    this.messagesService.scroll = this.scroll;
    this.messagesService.load();
    this.messagesService.scroll.nativeElement.scrollTop = this.messagesService.scroll.nativeElement.scrollHeight
  }

  handleRefresh(event: any) {
    this.messagesService.load(event)
  }
}
