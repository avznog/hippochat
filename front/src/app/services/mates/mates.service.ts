import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UpdatemateDto } from 'src/app/dto/mates/update-mate.dto';
import { Mate } from 'src/app/models/mate.model';

@Injectable({
  providedIn: 'root'
})
export class MatesService {

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {
  }

  async amInCouple() {
    return await lastValueFrom(this.http.get<boolean>("mates/am-in-couple"))
  }

  async updateMe(updateMateDto: UpdatemateDto) {
    this.http.patch(`mates/me`, updateMateDto).subscribe(() => {
      this.authService.refreshUser();
    })
  }

  async deleteAccount() {
    await lastValueFrom(this.http.delete(`mates`))
  }

  async me() {
    return await lastValueFrom(this.http.get<Mate>(`mates/me`));
  }
}
