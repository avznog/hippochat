import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateDaysEmojisDto } from 'src/app/dto/daysEmojis/create-days-emojis.dto';
import { DaysEmoji } from 'src/app/models/days-emoji.model';
import { CouplesService } from '../couples/couples.service';

@Injectable({
  providedIn: 'root'
})
export class DaysEmojisService {

  myTodaysEmoji?: DaysEmoji;
  myMatesTodaysEmoji?: DaysEmoji;

  allMyMonthly = new Map<string, DaysEmoji>();
  allMatesMonthly = new Map<string, DaysEmoji>();
  constructor(
    private http: HttpClient,
    private readonly authService: AuthService,
    private readonly couplesService: CouplesService
  ) { }

  async getMyTodaysEmoji() {
    this.myTodaysEmoji = await lastValueFrom(this.http.get<DaysEmoji>(`days-emojis/my-todays-emoji`));
  }

  async getMyMatesTodaysEmoji() {
    this.myMatesTodaysEmoji = await lastValueFrom(this.http.get<DaysEmoji>(`days-emojis/mate-todays-emoji`));
  }

  addTodaysDayEmoji(createDaysEmojisDto: CreateDaysEmojisDto) {
    this.http.post<DaysEmoji>(`days-emojis/create-today`, createDaysEmojisDto).subscribe(todayDayEmoji => {
      this.myTodaysEmoji = todayDayEmoji;
    })
  }

  async getAllMyMonthly(date: Date) {
    let httpPrams = new HttpParams();
    httpPrams = httpPrams.append("date", moment(date).tz(this.authService.currentUserSubject.getValue().timezone).toDate().toISOString());
    this.http.get<DaysEmoji[]>(`days-emojis/all-my-monthly`, { params: httpPrams }).subscribe(daysEmojis => {
      this.allMyMonthly.clear();
      daysEmojis.forEach(dayEmoji => {
        this.allMyMonthly.set(Number(dayEmoji.date.split("-")[2]).toString(), dayEmoji);
      })
    })
  }

  async getAllMatesMonthly(date: Date) {
    let httpParams = new HttpParams()
    httpParams = httpParams.append("date", moment(date).tz(this.couplesService.myMate?.timezone ?? this.authService.currentUserSubject.getValue().timezone).toDate().toISOString());
    this.http.get<DaysEmoji[]>(`days-emojis/all-mates-monthly`, { params: httpParams }).subscribe(daysEmojis => {
      this.allMatesMonthly.clear();
      daysEmojis.forEach(dayEmoji => {
        this.allMatesMonthly.set(Number(dayEmoji.date.split("-")[2]).toString(), dayEmoji);
      })
    })
  }

  async addDayEmoji(createDaysEmojiDto: CreateDaysEmojisDto) {
    try {
      this.http.post<DaysEmoji>(`days-emojis/create-for-day`, createDaysEmojiDto).subscribe(dayEmoji => {
        this.allMyMonthly.set(Number(dayEmoji.date.split("-")[2]).toString(), dayEmoji);
      })
    } catch (error) {

    }
  }

}
