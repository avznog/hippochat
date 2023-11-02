import { Component, OnInit } from '@angular/core';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { DaysEmojisService } from 'src/app/services/daysEmojis/days-emojis.service';
import { DaysPicturesService } from 'src/app/services/daysPictures/days-pictures.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';

@Component({
  selector: 'app-moodboard',
  templateUrl: './moodboard.page.html',
  styleUrls: ['./moodboard.page.scss'],
})
export class MoodboardPage implements OnInit {

  who: "me" | "mate" = localStorage.getItem("who") as "me" | "mate" ?? 'me';
  timePeriod: "today" | "month" = localStorage.getItem("timePeriod") as "today" | "month" ?? "today";
  constructor(
    public readonly publicProfileService: PublicProfileService,
    public readonly daysEmojisService: DaysEmojisService,
    public readonly daysPicturesService: DaysPicturesService
  ) { }

  async ngOnInit() {
  }

  async onChangeTimePeriod() {
    localStorage.setItem("timePeriod", this.timePeriod)
    Haptics.notification({
      type: NotificationType.Warning
    });
  }

  async onChangeMate() {
    localStorage.setItem("who", this.who)
    Haptics.notification({
      type: NotificationType.Warning
    });
  }

}