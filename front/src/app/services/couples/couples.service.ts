import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCoupleDto } from '../../dto/couples/create-couple.dto';
import { Couple } from 'src/app/models/couple.model';
import { lastValueFrom } from 'rxjs';
import { UpdateCoupleDto } from "../../dto/couples/update-couple.dto";

@Injectable({
  providedIn: 'root'
})
export class CouplesService {

  myCouple?: Couple;
  constructor(
    private http: HttpClient
  ) { }

  async create(createCoupleDto: CreateCoupleDto ) {
    return await lastValueFrom(this.http.post<Couple>(`couples/`, createCoupleDto))
  }

  getMyCouple() {
    this.http.get<Couple>(`couples/my-couple`).subscribe(couple => {
      this.myCouple = couple;
    })
  }

  updateMyCouple(updateCoupleDto: UpdateCoupleDto ) {
    this.http.patch<Couple>(`couples/update-my-couple`, updateCoupleDto).subscribe(couple => this.myCouple = couple);
  }

}
