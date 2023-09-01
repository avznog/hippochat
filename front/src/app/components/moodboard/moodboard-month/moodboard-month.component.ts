import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CouplesService } from 'src/app/services/couples/couples.service';

@Component({
  selector: 'app-moodboard-month',
  templateUrl: './moodboard-month.component.html',
  styleUrls: ['./moodboard-month.component.scss'],
})
export class MoodboardMonthComponent  implements OnInit {

  calendarDate: Date = new Date();
  constructor(
    public readonly authService: AuthService,
    public readonly coupleService: CouplesService
  ) { }

  ngOnInit() {
    this.coupleService.getMyMate()
  }

  onChangeDate(event: any) {
    this.calendarDate = new Date(event.detail.value);
  }

}
