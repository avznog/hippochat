import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { IonicModule } from '@ionic/angular';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';

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
    private readonly messageService: MessagesService,
    public readonly publicProfileService: PublicProfileService
  ) { }

  ngOnInit() {
  }

  onSendMessage() {
    this.messageService.create({
      value: this.message
    });
    this.message = "";
  }

  async onTakePrivatePicture() {
    Haptics.impact({
      style: ImpactStyle.Heavy
    });
    const picture = await Camera.getPhoto({
      correctOrientation: true,
      promptLabelCancel: "Annuler",
      promptLabelPhoto: "Pellicule",
      promptLabelHeader: "Prendre une photo coquine ? Cette photo ne pourra être ouverte qu'une seule fois par ton mate. Nous supprimons la photo de nos serveurs une fois ouverte.",
      promptLabelPicture: "Prendre une photo",
      allowEditing: false,
      quality: 100,
      resultType: CameraResultType.DataUrl,
      saveToGallery: false
    });
    this.messageService.createPrivatePicture(picture);
  }

}
