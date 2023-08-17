import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCouplePage } from './my-couple.page';


const routes: Routes = [
  {
    path: '',
    component: MyCouplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCouplePageRoutingModule {}
