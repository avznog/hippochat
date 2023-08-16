import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { MatesService } from 'src/app/services/mates/mates.service';

@Component({
  selector: 'app-no-mate',
  templateUrl: './no-mate.component.html',
  styleUrls: ['./no-mate.component.scss'],
})
export class NoMateComponent  implements OnInit {

  gender: string = "male";
  name: string = "";
  loading: boolean = true;
  constructor(
    public readonly matesService: MatesService
  ) { }

  ngOnInit() {
    this.matesService.findAllSingle(this.gender, this.name, true)
      .then(() => this.loading = false)
  }

  async loadSingleMates(reset: boolean) {
    this.loading = true;
    await this.matesService.findAllSingle(this.gender, this.name, reset)
    this.loading = false;
  }

  async onIonInfinite(e: any) {
    setTimeout(() => {
      (e as InfiniteScrollCustomEvent).target.complete();
      this.loadSingleMates(false)

    }, 500);
  }

  test() {
    console.log('mlkj')
  }
}
