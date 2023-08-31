import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoodboardPage } from './moodboard.page';

const routes: Routes = [
  {
    path: '',
    component: MoodboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoodboardPageRoutingModule {}
