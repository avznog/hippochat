import { Component, OnInit } from '@angular/core';

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
}