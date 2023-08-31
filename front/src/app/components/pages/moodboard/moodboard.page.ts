import { Component, OnInit } from '@angular/core';
import { Haptics, NotificationType } from '@capacitor/haptics';

@Component({
  selector: 'app-moodboard',
  templateUrl: './moodboard.page.html',
  styleUrls: ['./moodboard.page.scss'],
})
export class MoodboardPage implements OnInit {

  timePeriod: "today" | "month" = "today";
  constructor() { }

  ngOnInit() {
  }

  onChangeTimePeriod() {
    Haptics.notification({
      type: NotificationType.Warning
    })
  }
}