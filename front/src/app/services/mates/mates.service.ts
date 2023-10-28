import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UpdatemateDto } from 'src/app/dto/mates/update-mate.dto';
import { Mate } from 'src/app/models/mate.model';

@Injectable({
  providedIn: 'root'
})
export class MatesService {

  singleMates!: Mate[];

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.findAllSingle("", true);
  }

  async amInCouple() {
    return await lastValueFrom(this.http.get<boolean>("mates/am-in-couple"))
  }

  async findAllSingle(name: string, reset: boolean) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", name);
    this.http.get<Mate[]>(`mates/find-all-single/`, { params: queryParams }).subscribe(singleMates => {
      reset ? this.singleMates = singleMates : this.singleMates = this.singleMates.concat(singleMates);
    })
  }

  async updateMe(updateMateDto: UpdatemateDto) {
    this.http.patch(`mates/me`, updateMateDto).subscribe(() => {
      this.authService.refreshUser();
    })
  }
}
