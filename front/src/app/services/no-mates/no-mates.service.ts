import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsFindAllSingleDto } from 'src/app/dto/no-mates/params-find-all-single.dto';
import { Mate } from 'src/app/models/mate.model';

@Injectable({
  providedIn: 'root'
})
export class NoMatesService {
  singleMates: Mate[] = [];
  isLoadingSingleMates: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  updateSingleMates(params: ParamsFindAllSingleDto, reset?: boolean) {
    this.isLoadingSingleMates = true;
    if (reset) {
      params.page = 0;
    }
    this.http.post<Mate[]>(`mates/find-all-single`, params).subscribe(singleMates => {
      reset ? this.singleMates = singleMates : this.singleMates.push(...singleMates);
      this.singleMates = this.singleMates.sort((a: Mate, b: Mate) => a.firstname > b.firstname ? 1 : -1);
      this.isLoadingSingleMates = false;
    });
  }
}
