import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCoupleDto } from '../../dto/couples/create-couple.dto';
import { Couple } from 'src/app/models/couple.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouplesService {

  constructor(
    private http: HttpClient
  ) { }

  async create(createCoupleDto: CreateCoupleDto ) {
    return await lastValueFrom(this.http.post<Couple>(`couples/`, createCoupleDto))
  }

}
