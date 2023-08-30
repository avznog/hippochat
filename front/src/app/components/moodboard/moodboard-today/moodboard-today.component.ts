import { Component, OnInit } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { AlertButton, AlertInput } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { DaysEmojisService } from 'src/app/services/daysEmojis/days-emojis.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';
import { SocketDaysEmojisService } from 'src/app/services/sockets/socket-days-emojis/socket-days-emojis.service';

@Component({
  selector: 'app-moodboard-today',
  templateUrl: './moodboard-today.component.html',
  styleUrls: ['./moodboard-today.component.scss'],
})
export class MoodboardTodayComponent  implements OnInit {

  who: "me" | "mate" = "me";
  constructor(
    public readonly publicProfileService: PublicProfileService,
    public readonly daysEmojisService: DaysEmojisService,
    private readonly authService: AuthService,
    private readonly socketDaysEmojisService: SocketDaysEmojisService // ? leave for socket io listener
  ) { 
    this.publicProfileService.getMyMatesPublicProfile();
    this.daysEmojisService.getMyTodaysEmoji();
    this.daysEmojisService.getMyMatesTodaysEmoji();
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

}
