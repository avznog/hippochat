import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketDaysPictures } from 'src/app/providers/socket-days-pictures.providers';
import { DaysPicturesService } from '../../daysPictures/days-pictures.service';
import { DaysPicture } from 'src/app/models/days-picture.model';

@Injectable({
  providedIn: 'root'
})
export class SocketDaysPicturesService {

  constructor(
    private readonly socket: SocketDaysPictures,
    private readonly daysPicturesService: DaysPicturesService
  ) {
    this.updateMatesDaysPicture().subscribe();
   }

  updateMatesDaysPicture() {
    return new Observable<any>(() => {
      this.socket.on("update-my-todays-picture", (todaysPicture: DaysPicture) => {
        this.daysPicturesService.myMatesTodaysPicture = todaysPicture;
        this.daysPicturesService.getMyMatesTodaysPicture();
      })
    })
  }
}
