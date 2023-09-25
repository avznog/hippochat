import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { ModalController } from '@ionic/angular';
import { PrivatePictureModalComponent } from 'src/app/components/conversation/private-picture-modal/private-picture-modal.component';
import { CreateMessageDto } from 'src/app/dto/messages/create-message.dto';
import { Message } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: Message[] = [];
  scroll: any;
  privateMessage?: Message;
  privateMessageModal?: HTMLIonModalElement;
  isLoadingPrivatePicture: boolean = false;

  constructor(
    private http: HttpClient,
    private modalController: ModalController
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
      this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight
    })
  }

  async createPrivatePicture(picture: Photo) {
    const formData = new FormData();
    formData.append("file", new File([new Blob([await (await fetch(picture.dataUrl!)).blob()])], `private-picture-${new Date().toISOString()}.${picture.format}`, {
      lastModified: new Date().getTime()
    }));
    this.http.post<Message>(`messages/create-private-picture`, formData).subscribe(message => {
      this.messages.push({
        ...message,
        date: new Date(message.date)
      });
      this.sortMessages();
      Haptics.notification({
        type: NotificationType.Success
      });
    })
  }

  async openPrivatePicture(message: Message) {
    this.isLoadingPrivatePicture = true
    this.http.get<string>(`messages/get-private-picture/${message.id}`).subscribe(async url => {
      if (!url) {
        this.messages[this.messages.indexOf(message)] = { ...message, privatePictureOpened: true }
      } else {
        this.privateMessage = { ...message, privatePicture: url };
        this.messages[this.messages.indexOf(message)] = this.privateMessage;
        const modal = await this.modalController.create({
          component: PrivatePictureModalComponent,
          animated: true
        });
        this.privateMessageModal = modal;
        modal.present();
      }
      this.isLoadingPrivatePicture = false;
    })
  }

  async destroyPrivatePicture() {
    this.http.get(`messages/destroy-private-picture/${this.privateMessage?.id}`).subscribe();
    this.messages[this.messages.indexOf(this.privateMessage!)] = {
      ...this.privateMessage!,
      privatePictureOpened: true
    }
    this.privateMessageModal?.dismiss();
  }

  sortMessages() { this.messages = this.messages.sort((a, b) => (a.date.getTime() - b.date.getTime())) };

}
