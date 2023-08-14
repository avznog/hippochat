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
    return this.http.get<boolean>("mates/am-in-couple").subscribe(d => console.log(d))
  }
}
