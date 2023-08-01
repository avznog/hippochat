import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMatePage } from './my-mate.page';

const routes: Routes = [
  {
    path: '',
    component: MyMatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMatePageRoutingModule {}
