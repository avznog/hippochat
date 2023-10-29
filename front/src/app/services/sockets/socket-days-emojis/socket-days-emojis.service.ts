import { Injectable } from '@angular/core';
import { DaysEmoji } from 'src/app/models/days-emoji.model';
import { SocketDaysEmojis } from 'src/app/providers/socket-days-emojis.provider';
import { DaysEmojisService } from '../../daysEmojis/days-emojis.service';

@Injectable({
  providedIn: 'root'
})
export class SocketDaysEmojisService {

  constructor(
    private socket: SocketDaysEmojis,
    private readonly daysEmojisService: DaysEmojisService
  ) {
    this.updateTodaysDayEmoji()
  }

  updateTodaysDayEmoji() {
    this.socket.on("update-day-emoji", (dayEmoji: DaysEmoji) => {
      this.daysEmojisService.myMatesTodaysEmoji = dayEmoji;
    })
  }
}
