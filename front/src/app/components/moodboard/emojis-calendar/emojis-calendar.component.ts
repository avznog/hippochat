import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { Mate } from 'src/app/models/mate.model';
import { CouplesService } from 'src/app/services/couples/couples.service';
import { DaysEmojisService } from 'src/app/services/daysEmojis/days-emojis.service';

@Component({
  selector: 'app-emojis-calendar',
  templateUrl: './emojis-calendar.component.html',
  styleUrls: ['./emojis-calendar.component.scss'],
})
export class EmojisCalendarComponent implements OnInit {

  calendar = new Map<number, Map<number, string | null>>();
  constructor(
    public readonly daysEmojisService: DaysEmojisService,
    private readonly couplesService: CouplesService,
    private readonly authService: AuthService
  ) { }

  @Input() date: Date = new Date();
  mate: Mate | undefined = {} as Mate;
  @Input() location?: "bottom" | "top";
  @Input() myMate: boolean = false;

  boyImage = '../../../../assets/couple-icons/boy-iso-color.webp';
  boyReversedImage = '../../../../assets/couple-icons/boy-iso-color-reversed.webp';
  girlImage = '../../../../assets/couple-icons/girl-iso-color.webp';
  girlReversedImage = '../../../../assets/couple-icons/girl-iso-color-reversed.webp';

  ngOnInit() {
    this.setMate();
  }

  async setMate() {
    if (this.myMate) {
      this.mate = await this.couplesService.returnMyMate();
      this.daysEmojisService.getAllMatesMonthly(this.date)
    } else {
      this.mate = this.authService.currentUserSubject.getValue();
      this.daysEmojisService.getAllMyMonthly(this.date)
    }
  }

  ngOnChanges(changes: any) {
    this.calendar.clear();
    this.fillCalendar(this.date);
    this.daysEmojisService.getAllMyMonthly(this.date);
    this.daysEmojisService.getAllMatesMonthly(this.date);
  }


  fillCalendar(date: Date) {
    // ? getting the first day of the month & adjusting with the firstday of the week
    let firstDayOfMonth = () => {
      let d = moment(moment(date).tz(this.mate?.timezone ?? 'Europe/Paris').startOf("month").toDate()).tz(this.mate?.timezone ?? 'Europe/Paris').day();
      d === 0 ? (d = 6) : (d--)
      return d
    }

    // ? getting the last day of the month
    const end = moment(date).daysInMonth()

    // ? data for building the calendar
    let day = 1;
    let weekDay = 0;
    let week = 0;

    while (day <= end) {

      // ? if the week has not been registred yet, create the map
      if (!this.calendar.get(week)) {
        this.calendar.set(week, new Map<number, string>())
      }

      // ? fill with null values for days of the first week before the 1 starts
      if (week === 0 && weekDay < firstDayOfMonth()) {
        this.calendar.get(week)?.set(weekDay, null)
        weekDay++;
        continue;
      } else {
        // ? fill the calendar
        this.calendar.get(week)?.set(weekDay, day.toString())
      }

      day++;
      if (weekDay === 6) {
        weekDay = 0;
        week++;
      } else {
        weekDay++;
      }
    }
  }

}
