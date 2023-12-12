import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginGuardFn } from './guards/loginFn.guard';
import { LoggedGuardFn } from './guards/loggedFn.guard';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { NoMateComponent } from './components/pages/auth/no-mate/no-mate.component';
import { HasMateGuardFn } from './guards/has-mateFn.guard';
import { NoMateGuardFn } from './guards/no-mateFn.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
    canActivate: [LoginGuardFn()]
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full",
    canActivate: [LoginGuardFn()]
  },
  {
    path: 'home',
    component: NavbarComponent,
    canActivate: [LoggedGuardFn(), NoMateGuardFn()],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/conversation',
      },
      {
        path: 'conversation',
        loadChildren: () => import('./components/pages/conversation/conversation.module').then(m => m.ConversationPageModule),
        canActivate: [LoggedGuardFn(), NoMateGuardFn()]
      },
      {
        path: 'moodboard',
        pathMatch: "full",
        loadChildren: () => import('./components/pages/moodboard/moodboard.module').then(m => m.MoodboardPageModule),
        canActivate: [LoggedGuardFn(), NoMateGuardFn()]
      },
      {
        path: 'my-couple',
        loadChildren: () => import('./components/pages/my-couple/my-couple.module').then(m => m.MyCouplePageModule),
        canActivate: [LoggedGuardFn(), NoMateGuardFn()]
      },
      {
        path: 'my-album',
        loadChildren: () => import('./components/pages/my-album/my-album.module').then(m => m.MyAlbumPageModule),
        canActivate: [LoggedGuardFn(), NoMateGuardFn()]
      }
    ]
  },
  {
    path: "no-mate",
    component: NoMateComponent,
    canActivate: [LoggedGuardFn(), HasMateGuardFn()]
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
export class AppRoutingModule { }
