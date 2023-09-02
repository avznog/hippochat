import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import * as moment from 'moment-timezone';
import { lastValueFrom } from 'rxjs';
import { DaysPicture } from 'src/app/models/days-picture.model';

@Injectable({
  providedIn: 'root'
})
export class DaysPicturesService {

  myTodaysPicture?: DaysPicture;
  myMatesTodaysPicture?: DaysPicture;
  constructor(
    private http: HttpClient
  ) {
   }

  async getMyTodaysPicture() {
    this.myTodaysPicture = await lastValueFrom(this.http.get<DaysPicture>(`days-pictures/get-my-todays-picture`));
    this.http.get(`days-pictures/get-my-today`, { responseType: "blob" }).subscribe(async file => {
       if (file.size === 0) {
        // TODO : mettre des images fun
        this.myTodaysPicture ? (this.myTodaysPicture.value = '../../../assets/days-pictures/user-calendar.png') : this.myTodaysPicture = {
          value: '../../../assets/days-pictures/user-calendar.png'
        } as DaysPicture
      } else {
        this.myTodaysPicture ? (this.myTodaysPicture.value = await this.createProfilePicture(file)) : this.myTodaysPicture = {
          value: '../../../assets/days-pictures/user-calendar.png'
        } as DaysPicture
      }
    })
  }

  async getMyMatesTodaysPicture() {
    this.myMatesTodaysPicture = await lastValueFrom(this.http.get<DaysPicture>(`days-pictures/get-mates-todays-picture`));
    this.http.get(`days-pictures/get-my-mates-today`, { responseType: "blob" }).subscribe(async file => {
      if (file.size === 0) {
        // TODO : mettre des images fun
        this.myMatesTodaysPicture ? (this.myMatesTodaysPicture.value = '../../../assets/days-pictures/user-calendar.png') : this.myMatesTodaysPicture = {
          value: '../../../assets/days-pictures/user-calendar.png'
        } as DaysPicture
      } else {
        this.myMatesTodaysPicture ? (this.myMatesTodaysPicture.value = await this.createProfilePicture(file)) : this.myMatesTodaysPicture = {
          value: '../../../assets/days-pictures/user-calendar.png'
        } as DaysPicture
      }
    })
  }

  async createProfilePicture(file: Blob) {
    return URL.createObjectURL(new Blob([await file.arrayBuffer()]));
  }

  async addTodayDayPicture(picture: Photo) {
    const formData = new FormData();
    formData.append("file", new File([new Blob([await (await fetch(picture.dataUrl!)).blob()])], `${moment(new Date()).format("YYYY-MM-DD")}.${picture.format}`, {
      lastModified: new Date().getTime(),
    }));
    this.http.post<DaysPicture>(`days-pictures/create-today`, formData).subscribe(todaysPicture => {
      this.myTodaysPicture = todaysPicture;
      this.getMyTodaysPicture();
    })
  }
}
