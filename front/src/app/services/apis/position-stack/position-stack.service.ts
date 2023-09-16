import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionStackService {

  constructor(
    private http: HttpClient
  ) { }

  async getAddress(location: {latitude: string, longitude: string}) : Promise<string> {
    return await lastValueFrom(this.http.post<string>(`position-stack`, {
      location: location,
      limit: 1
    }))
    
  }
}
