import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatesService {

  constructor(
    private http: HttpClient
  ) { }

  async amInCouple() {
    return await lastValueFrom(this.http.get<boolean>("mates/am-in-couple"))
  }
}
