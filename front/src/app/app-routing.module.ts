import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginGuard } from './guards/login.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: NavbarComponent,
    canActivate: [LoggedGuard],
    canActivateChild: [LoggedGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/conversation'
      },
      {
        path: 'conversation',
        loadChildren: () => import('./components/pages/conversation/conversation.module').then( m => m.ConversationPageModule)
      },
      {
        path: 'calendars',
        pathMatch: "full",
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
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
