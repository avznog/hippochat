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

  myCurrentAlbumPicture?: string | null;
  myMatesCurrentAlbumPicture?: string | null;
  
  isLoadingAlbumPictures: boolean = false;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
   }

  async getMyTodaysPicture() {
    this.loadMyTodaysPicture = true;
    this.myTodaysPicture = await lastValueFrom(this.http.get<DaysPicture>(`days-pictures/get-my-todays-picture`));
    this.http.get(`days-pictures/get-my-today`, { responseType: "blob" }).subscribe(async file => {
       if (file.size === 0) {
        // TODO : mettre des images fun
        this.myTodaysPicture  = null;
      } else {
        this.myTodaysPicture ? (this.myTodaysPicture.value = await this.createProfilePicture(file)) : this.myTodaysPicture = null;
      }
      this.loadMyTodaysPicture = false;
    })
  }

  async getMyMatesTodaysPicture() {
    this.loadMatesTodaysPicture = true;
    this.myMatesTodaysPicture = await lastValueFrom(this.http.get<DaysPicture>(`days-pictures/get-mates-todays-picture`));
    this.http.get(`days-pictures/get-my-mates-today`, { responseType: "blob" }).subscribe(async file => {
      if (file.size === 0) {
        // TODO : mettre des images fun
        this.myMatesTodaysPicture = null;
      } else {
        this.myMatesTodaysPicture ? (this.myMatesTodaysPicture.value = await this.createProfilePicture(file)) : this.myMatesTodaysPicture = null;
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

  async loadAlbumPictures(date: Date) {
    this.isLoadingAlbumPictures = true;
    const myPicturePromise = await lastValueFrom(this.http.get(`days-pictures/get-my-for-date/${date}`, { responseType: 'blob' }));
    const myMatesPicturePromise = await lastValueFrom(this.http.get(`days-pictures/get-mates-for-date/${date}`, { responseType: 'blob' }));

    const [myPicture, myMatesPicture]: [PromiseSettledResult<Blob>, PromiseSettledResult<Blob>] = await Promise.allSettled([
      myPicturePromise, myMatesPicturePromise
    ]);
    if(myPicture.status === "fulfilled")
      if(myPicture.value.size === 0)
        this.myCurrentAlbumPicture = null;
      else
        this.myCurrentAlbumPicture = await this.createProfilePicture(myPicture.value)
    

    if(myMatesPicture.status === "fulfilled")
      if(myMatesPicture.value.size === 0)
        this.myMatesCurrentAlbumPicture = null;
      else
        this.myMatesCurrentAlbumPicture = await this.createProfilePicture(myMatesPicture.value)
    this.isLoadingAlbumPictures = false;
  }
}
