import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'conversation'
      },
      {
        path: 'conversation',
        loadChildren: () => import('./components/pages/conversation/conversation.module').then( m => m.ConversationPageModule)
      },
      {
        path: 'calendars',
        loadChildren: () => import('./components/pages/calendars/calendars.module').then( m => m.CalendarsPageModule)
      },
      {
        path: 'my-mate',
        loadChildren: () => import('./components/pages/my-mate/my-mate.module').then( m => m.MyMatePageModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./components/pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
      }
    ]
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
