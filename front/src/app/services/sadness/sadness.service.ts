import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSadnessDto } from 'src/app/dto/sadness/create-sadness.dto';
import { Sadness } from 'src/app/models/sadness.model';
import { PublicProfileService } from '../publicProfile/public-profile.service';

@Injectable({
  providedIn: 'root'
})
export class SadnessService {

  constructor(
    private http: HttpClient,
    private publicProfileService: PublicProfileService
  ) { }

  create(createSadnessDto: CreateSadnessDto) {
    this.http.post<Sadness>(`sadness`, createSadnessDto).subscribe(sadness => {
      this.publicProfileService.myPublicProfile!.sadness = this.publicProfileService.myPublicProfile!.sadness.concat(sadness)
    })
  }
}
