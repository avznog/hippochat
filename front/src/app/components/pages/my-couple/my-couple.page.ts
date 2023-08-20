import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Toast } from '@capacitor/toast';
import { AlertButton, AlertInput } from '@ionic/angular';
import { CouplesService } from 'src/app/services/couples/couples.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';
import { SadnessService } from 'src/app/services/sadness/sadness.service';

@Component({
  selector: 'app-my-couple',
  templateUrl: './my-couple.page.html',
  styleUrls: ['./my-couple.page.scss'],
})
export class MyCouplePage implements OnInit {
  cancelHaptics = () => Haptics.notification({
    type: NotificationType.Error
  });

  successHaptics = () => Haptics.notification({
    type: NotificationType.Success
  })

  coupleNicknameAlertButtons: AlertButton[] = [
    {
      text: "Annuler",
      role: "destructive",
      handler: () => this.cancelHaptics()
    },
    {
      text: "Modifier",
      role: "confirm",
      handler: (answer) => {
        this.coupleService.updateMyCouple({
          name: answer.name
        })
        this.successHaptics();
      }
    }
  ]
  coupleNicknameAlertInputs: AlertInput[] = [
    {
      type: "text",
      name: "name",
      placeholder: "Notre super couple !"
    }
  ]

  emojiAlertButtons: AlertButton[] = [
    {
      text: "Annuler",
      role: "destructive",
      handler: () => this.cancelHaptics()

    },
    {
      text: "Modifier",
      role: "confirm",
      handler: async (answer) => {
        if(this.regexEmoji.exec(answer.profileEmoji)?.length === undefined || !this.regexEmoji.test(answer.profileEmoji)) {
          Toast.show({
            text: "Vous devez entrer un émoji valide",
            duration: "long",
          });
        } else (
          this.publicProfileService.updateMyPublicProfile({
            profileEmoji: answer.profileEmoji,
            lastBatteryPercentage: (await Device.getBatteryInfo()).batteryLevel?.toString()
          })
        )
        this.successHaptics();
      }
    }
  ]
  emojiAlertInputs: AlertInput[] = [
    {
      name: "profileEmoji",
      type: "text",
      placeholder: "Un émoji fou !",
    }
  ]

  mateNicknameAlertButtons: AlertButton[] = [
    {
      text: "Annuler",
      role: "destructive",
      handler: () => this.cancelHaptics()
    },
    {
      text: "Modifier",
      role: "confirm",
      handler: (answer) => {
        this.publicProfileService.updateMyMatesPublicProfile({
          nickname: answer.mateNickname
        })
        this.successHaptics();
      }
    }
  ]
  mateNicknameAlertInputs: AlertInput[] = [
    {
      type: "text",
      name: "mateNickname",
      placeholder: "Mon super bébé !"
    }
  ]

  regexEmoji = new RegExp("(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])")

  constructor(
    public readonly coupleService: CouplesService,
    public readonly publicProfileService: PublicProfileService,
    private readonly sadnessService: SadnessService
  ) { }

  ngOnInit() {
    this.coupleService.getMyCouple();
    this.publicProfileService.getMyPublicProfile();
    this.publicProfileService.getMyMatesPublicProfile();
    this.publicProfileService.updateMyBatteryPercentage();
  }

  onClickSadness() {
    console.log("lkjh")
    this.sadnessService.create({
      date: new Date()
    });
    Haptics.impact({
      style: ImpactStyle.Medium
    })
  }
}
