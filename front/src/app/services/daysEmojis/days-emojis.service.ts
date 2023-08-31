import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CreateDaysEmojisDto } from 'src/app/dto/daysEmojis/create-days-emojis.dto';
import { DaysEmoji } from 'src/app/models/days-emoji.model';

@Injectable({
  providedIn: 'root'
})
export class DaysEmojisService {

  myTodaysEmoji?: DaysEmoji;
  myMatesTodaysEmoji?: DaysEmoji;
  constructor(
    private http: HttpClient
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

}
