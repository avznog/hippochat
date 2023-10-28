import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Couple } from 'src/app/models/couple.model';
import { Mate } from 'src/app/models/mate.model';
import { UpdateCoupleDto } from "../../dto/couples/update-couple.dto";

@Injectable({
  providedIn: 'root'
})
export class CouplesService {

  myCouple?: Couple;
  myMate?: Mate;
  constructor(
    private http: HttpClient
  ) {
    this.getMyCouple();
  }

  getMyCouple() {
    this.http.get<Couple>(`couples/my-couple`).subscribe(couple => this.myCouple = couple)
  }

  updateMyCouple(updateCoupleDto: UpdateCoupleDto) {
    this.http.patch<Couple>(`couples/update-my-couple`, updateCoupleDto).subscribe(couple => this.myCouple = couple);
  }

  getMyMate() {
    this.http.get<Mate>(`mates/my`).subscribe(mate => this.myMate = mate);
  }

  async returnMyMate() {
    return await lastValueFrom(this.http.get<Mate>(`mates/my`));
  }
}
