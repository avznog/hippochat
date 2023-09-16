import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-private-picture-modal',
  templateUrl: './private-picture-modal.component.html',
  styleUrls: ['./private-picture-modal.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PrivatePictureModalComponent implements OnInit {

  constructor(
    public readonly messagesService: MessagesService
  ) { }

  clicked: boolean = false;

  ngOnInit() { }

  onDismiss() {
    this.messagesService.destroyPrivatePicture();
  }

  onUnBlur() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
      this.messagesService.destroyPrivatePicture();
    }, 10000);
  }

}
