import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { Mate } from 'src/app/models/mate.model';
import { CouplesService } from 'src/app/services/couples/couples.service';
import { DaysPicturesService } from 'src/app/services/daysPictures/days-pictures.service';

@Component({
  selector: 'app-pictures-calendar',
  templateUrl: './pictures-calendar.component.html',
  styleUrls: ['./pictures-calendar.component.scss'],
})
export class PicturesCalendarComponent  implements OnInit {
  calendar = new Map<number, Map<number, string | null>>();

  @Input() mate?: Mate;
  @Input() myMate: boolean = false;

  constructor(
    private readonly couplesService: CouplesService,
    private readonly authService: AuthService,
    public readonly daysPicturesService: DaysPicturesService
  ) { }

  ngOnInit() {
    this.setMate()
    this.fillCalendar(new Date());
    this.daysPicturesService.updateMonthPictures(new Date())
  }

  async setMate() {
    if(this.myMate) {
      this.mate = await this.couplesService.returnMyMate();
    } else {
      this.mate = this.authService.currentUserSubject.getValue();
    }
  }

  fillCalendar(date: Date) {
    // ? getting the first day of the month & adjusting with the firstday of the week
    let firstDayOfMonth = () => {
      let d = moment(moment(date).tz(this.mate?.timezone ?? 'Europe/Paris').startOf("month").toDate()).tz(this.mate?.timezone ?? 'Europe/Paris').day();
      d === 0 ? (d = 6) : (d --)
      return d
    }
    
    // ? getting the last day of the month
    const end = moment(date).daysInMonth()
    
    // ? data for building the calendar
    let day = 1;
    let weekDay = 0;
    let week = 0;

    while(day <= end) {

      // ? if the week has not been registred yet, create the map
      if(!this.calendar.get(week)){
        this.calendar.set(week, new Map<number, string>())
      }

      // ? fill with null values for days of the first week before the 1 starts
      if(week === 0 && weekDay < firstDayOfMonth()) {
        this.calendar.get(week)?.set(weekDay, null)
        weekDay++;
        continue;
      } else {
        // ? fill the calendar
        this.calendar.get(week)?.set(weekDay, `${date.getFullYear()}-${date.getMonth()}-${day.toString()}`)
      }

      day ++;
      if(weekDay === 6)  {
        weekDay = 0;
        week ++;
      } else {
        weekDay ++;
      }
    }
  }

}
