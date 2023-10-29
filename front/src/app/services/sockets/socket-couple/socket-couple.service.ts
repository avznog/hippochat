import { Injectable } from '@angular/core';
import { Couple } from 'src/app/models/couple.model';
import { SocketCouple } from 'src/app/providers/socket-couple.provider';
import { CouplesService } from '../../couples/couples.service';

@Injectable({
  providedIn: 'root'
})
export class SocketCoupleService {

  constructor(
    private socket: SocketCouple,
    private readonly coupleService: CouplesService
  ) {
    this.updateMyCouple();
  }

  updateMyCouple() {
    this.socket.on("update-couple", (couple: Couple) => {
      this.coupleService.myCouple = couple;
    })
  }
}
