import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Toast } from '@capacitor/toast';
import { AlertButton, AlertInput } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { DaysEmojisService } from 'src/app/services/daysEmojis/days-emojis.service';
import { DaysPicturesService } from 'src/app/services/daysPictures/days-pictures.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';
import { SocketDaysEmojisService } from 'src/app/services/sockets/socket-days-emojis/socket-days-emojis.service';
import { SocketDaysPicturesService } from 'src/app/services/sockets/socket-days-pictures/socket-days-pictures.service';

@Component({
  selector: 'app-moodboard-today',
  templateUrl: './moodboard-today.component.html',
  styleUrls: ['./moodboard-today.component.scss'],
})
export class MoodboardTodayComponent  implements OnInit {

  @Input() who!: "me" | "mate";
  constructor(
    public readonly publicProfileService: PublicProfileService,
    public readonly daysEmojisService: DaysEmojisService,
    private readonly authService: AuthService,
    public readonly daysPicturesService: DaysPicturesService,
    private readonly socketDaysPicturesService: SocketDaysPicturesService, // ? leave for socket io listener
    private readonly socketDaysEmojisService: SocketDaysEmojisService // ? leave for socket io listener
  ) { 
    this.publicProfileService.getMyMatesPublicProfile();
    this.daysEmojisService.getMyTodaysEmoji();
    this.daysEmojisService.getMyMatesTodaysEmoji();
    this.daysPicturesService.getMyTodaysPicture();
    this.daysPicturesService.getMyMatesTodaysPicture();
  }

  ngOnInit() {}
  dayEmojiAlertButtons: AlertButton[] = [
    {
      text: "Annuler",
      role: "destructive"
    },
    {
      text: "Ajouter",
      handler: (data) => {
        if(!new RegExp("(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])").test(data.emoji)) {
          Toast.show({
            text: "L'emoji n'est pas valide",
            duration: "long",
          })
        } else {
          this.daysEmojisService.addTodaysDayEmoji({
            value: data.emoji, 
            date: moment(new Date()).tz(this.authService.currentUserSubject.getValue().timezone).format("YYYY-MM-DD")
          });
        }
      }
    }
  ];
  dayEmojiAlertInputs: AlertInput[] = [
    {
      type: "text",
      name: "emoji",
      placeholder: "Mon émoji",
    }
  ];

  async onAddDayPicture() {
    if(this.daysPicturesService.myTodaysPicture?.id) {
      Toast.show({
        text: "Tu as déjà posté ta photo du jour !!",
        duration: "long"
      });
      return
    } else {
      Camera.getPhoto({
        correctOrientation: true,
        promptLabelCancel: "Annuler",
        promptLabelPhoto: "Pellicule",
        promptLabelHeader:"Ajoute ta photo du jour !",
        promptLabelPicture: "Prendre une photo",
        allowEditing: false,
        quality: 100,
        resultType: CameraResultType.DataUrl,
        saveToGallery: true
      })
        .then(picture => {
          Haptics.notification({type: NotificationType.Success})
          this.daysPicturesService.addTodayDayPicture(picture);
        }
        )
        .catch(() => Haptics.notification({type: NotificationType.Error}));
      
    }
  }

  onChangeMate() {
    Haptics.notification({
      type: NotificationType.Warning
    })
  }

  onClickEmoji() {
    Haptics.impact({
      style: ImpactStyle.Heavy
    })
  }

  onClickPicture() {
    this.who === 'me' ? 
    Haptics.impact({
      style: ImpactStyle.Heavy
    }) : 
    Haptics.notification({
      type: NotificationType.Error
    });
  }

}
