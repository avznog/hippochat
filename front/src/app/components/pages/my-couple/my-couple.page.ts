import { Component, OnInit } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { AlertButton, AlertInput } from '@ionic/angular';
import { CouplesService } from 'src/app/services/couples/couples.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';

@Component({
  selector: 'app-my-couple',
  templateUrl: './my-couple.page.html',
  styleUrls: ['./my-couple.page.scss'],
})
export class MyCouplePage implements OnInit {

  nicknameAlertButtons: AlertButton[] = [
    {
      text: "Annuler",
      role: "destructive"
    },
    {
      text: "Modifier",
      role: "confirm",
      handler: (answer) => {
        this.coupleService.updateMyCouple({
          name: answer.name
        })
      }
    }
  ]
  nicknameAlertInputs: AlertInput[] = [
    {
      type: "text",
      name: "name",
      placeholder: "Notre super couple !"
    }
  ]

  emojiAlertButtons: AlertButton[] = [
    {
      text: "Annuler",
      role: "destructive"
    },
    {
      text: "Modifier",
      role: "confirm",
      handler: (answer) => {
        if(this.regexEmoji.exec(answer.profileEmoji)?.length === undefined || !this.regexEmoji.test(answer.profileEmoji)) {
          Toast.show({
            text: "Vous devez entrer un émoji valide",
            duration: "long",
          });
        } else (
          this.publicProfileService.updateMyPublicProfile({
            profileEmoji: answer.profileEmoji
          })
        )
      }
    }
  ]
  emojiAlertInputs: AlertInput[] = [
    {
      name: "profileEmoji",
      type: "text",
      placeholder: "😁",
    }
  ]

  regexEmoji = new RegExp("(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])")

  constructor(
    public readonly coupleService: CouplesService,
    public readonly publicProfileService: PublicProfileService,
  ) { }

  ngOnInit() {
    this.coupleService.getMyCouple();
    this.publicProfileService.getMyPublicProfile();
    this.publicProfileService.getMyMatesPublicProfile();
  }
}
