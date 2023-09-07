import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAlbumPage } from './my-album.page';

const routes: Routes = [
  {
    path: '',
    component: MyAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAlbumPageRoutingModule {}
