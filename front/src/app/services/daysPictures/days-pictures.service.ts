import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import * as moment from 'moment-timezone';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DaysPicture } from 'src/app/models/days-picture.model';

@Injectable({
  providedIn: 'root'
})
export class DaysPicturesService {

  myTodaysPicture?: DaysPicture | null;
  myMatesTodaysPicture?: DaysPicture | null;

  loadMyTodaysPicture: boolean = false;
  loadMatesTodaysPicture: boolean = false;

  myMonthPictures = new Map<string, string | null>();
  loadingMyMonthPictures: boolean = false;

  myMatesMonthPictures = new Map<string, string | null>();
  loadingMatesMonthPictures: boolean = false;
  daysLoaded: string[] = [];

  selectedDate!: string;
  myMate: boolean = false;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) { }

  async getMyTodaysPicture() {
    this.loadMyTodaysPicture = true;
    this.myTodaysPicture = await lastValueFrom(this.http.get<DaysPicture>(`days-pictures/get-my-todays-picture`));
    this.http.get<string>(`days-pictures/get-my-today`).subscribe(url => {
      if (!url) {
        this.myTodaysPicture = null;
      } else {
        this.myTodaysPicture ? (this.myTodaysPicture.value = url) : this.myTodaysPicture = null;
        this.myTodaysPicture && this.myMonthPictures.set(this.myTodaysPicture.date, url);
      }
      this.loadMyTodaysPicture = false;
    })
  }

  async getMyMatesTodaysPicture() {
    this.loadMatesTodaysPicture = true;
    this.myMatesTodaysPicture = await lastValueFrom(this.http.get<DaysPicture>(`days-pictures/get-mates-todays-picture`));
    this.http.get<string>(`days-pictures/get-my-mates-today`).subscribe(url => {
      if (!url) {
        // TODO : mettre des images fun
        this.myMatesTodaysPicture = null;
      } else {
        this.myMatesTodaysPicture ? (this.myMatesTodaysPicture.value = url) : this.myMatesTodaysPicture = null;
      }
      this.loadMatesTodaysPicture = false;
    })
  }

  async createProfilePicture(file: Blob) {
    return URL.createObjectURL(new Blob([await file.arrayBuffer()]));
  }

  async addTodayDayPicture(picture: Photo) {
    const formData = new FormData();
    formData.append("file", new File([new Blob([await (await fetch(picture.dataUrl!)).blob()])], `${moment(new Date()).tz(this.authService.currentUserSubject.getValue().timezone).format("YYYY-MM-DD")}.${picture.format}`, {
      lastModified: new Date().getTime(),
    }));
    this.http.post<DaysPicture>(`days-pictures/create-today`, formData).subscribe(todaysPicture => {
      this.myTodaysPicture = todaysPicture;
      this.getMyTodaysPicture();
    })
  }

  async updateMyMonthPictures(date: Date) {
    if (this.daysLoaded.includes(moment(date).format("YYYY-MM-DD"))) {
    } else {
      this.loadingMyMonthPictures = true;
      const urls = await lastValueFrom(this.http.get<{ date: string, value: string }[][]>(`days-pictures/my-month/${date}`));
      urls[0].forEach((url: { date: string, value: string }) => {
        this.myMonthPictures.set(url.date, url.value)
      })
      this.loadingMyMonthPictures = false;
      this.daysLoaded.push(moment(date).format("YYYY-MM-DD"))
    }
  }

  async updateMatesMonthPictures(date: Date) {
    if (this.daysLoaded.includes(moment(date).format("YYYY-MM-DD"))) {
    } else {
      this.loadingMatesMonthPictures = true;
      const urls = await lastValueFrom(this.http.get<{ date: string, value: string }[][]>(`days-pictures/mates-month/${date}`));
      urls[0].forEach((url: { date: string, value: string }) => {
        this.myMatesMonthPictures.set(url.date, url.value)
      })
      this.loadingMatesMonthPictures = false;
      this.daysLoaded.push(moment(date).format("YYYY-MM-DD"))
    }
  }

  async loadHighQualityPictures(date: string) {
    this.http.get<string>(`days-pictures/my-one-picture/${date}`).subscribe(url => {
      url && this.myMonthPictures.set(date, url);
    });
    this.http.get<string>(`days-pictures/mate-one-picture/${date}`).subscribe(url => {
      url && this.myMatesMonthPictures.set(date, url);
    })
  }
}
