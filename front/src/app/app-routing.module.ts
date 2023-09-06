import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { NoMateGuard } from './guards/no-mate.guard';
import { NoMateComponent } from './components/pages/auth/no-mate/no-mate.component';
import { HasMateGuard } from './guards/has-mate.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: NavbarComponent,
    canActivate: [LoggedGuard, NoMateGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/conversation',
      },
      {
        path: 'conversation',
        loadChildren: () => import('./components/pages/conversation/conversation.module').then( m => m.ConversationPageModule),
        canActivate: [LoggedGuard, NoMateGuard]
      },
      {
        path: 'moodboard',
        pathMatch: "full",
        loadChildren: () => import('./components/pages/moodboard/moodboard.module').then( m => m.MoodboardPageModule),
        canActivate: [LoggedGuard, NoMateGuard]
      },
      {
        path: 'my-couple',
        loadChildren: () => import('./components/pages/my-couple/my-couple.module').then( m => m.MyCouplePageModule),
        canActivate: [LoggedGuard, NoMateGuard]
      },
      {
        path: 'my-album',
        loadChildren: () => import('./components/pages/my-album/my-album.module').then( m => m.MyAlbumPageModule),
        canActivate: [LoggedGuard, NoMateGuard]
      }
    ]
  },
  {
    path: "no-mate",
    component: NoMateComponent,
    canActivate: [LoggedGuard, HasMateGuard]
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
