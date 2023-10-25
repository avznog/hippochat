import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Couple } from 'src/app/models/couple.model';
import { Mate } from 'src/app/models/mate.model';
import { CreateCoupleDto } from '../../dto/couples/create-couple.dto';
import { UpdateCoupleDto } from "../../dto/couples/update-couple.dto";
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CouplesService {

  myCouple?: Couple;
  myMate?: Mate;
  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.getMyCouple();
  }

  async create(createCoupleDto: CreateCoupleDto) {
    return await lastValueFrom(this.http.post<Couple>(`couples/`, createCoupleDto))
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

  async becomeSingle() {
    try {
      this.http.get(`couple/become-single`).subscribe()
      this.authService.logout();
    } catch (error) {
      console.log(error)
    }
  }
}
