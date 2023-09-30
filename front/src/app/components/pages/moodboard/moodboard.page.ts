import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
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
    if (Capacitor.isNativePlatform()) {
      this.who = (await Preferences.get({ key: "who" })).value as "me" | "mate" ?? "me";
      this.timePeriod = (await Preferences.get({ key: "timePeriod" })).value as "today" | "month" ?? "today";
    }
  }

  async onChangeTimePeriod() {
    localStorage.setItem("timePeriod", this.timePeriod)
    Haptics.notification({
      type: NotificationType.Warning
    });
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({
        key: "timePeriod",
        value: this.timePeriod
      });
    }
  }

  async onChangeMate() {
    localStorage.setItem("who", this.who)
    Haptics.notification({
      type: NotificationType.Warning
    });
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({
        key: "who",
        value: this.who
      });
    }
  }

}