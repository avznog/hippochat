import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { IonContent, IonicModule } from '@ionic/angular';
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
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  ngOnInit(): void {
  }

  async handleRefresh(event: any) {
    this.messagesService.load(event)
  }

  ngAfterViewInit() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.content?.getScrollElement().then(scrollEl => {
      const height = scrollEl.scrollHeight;
      this.content?.scrollByPoint(0, height, 300);
      Haptics.notification({
        type: NotificationType.Success
      });
    });
  }

}
