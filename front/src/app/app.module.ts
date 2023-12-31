import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import player from "lottie-web";
import { LottieModule } from 'ngx-lottie';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PagesModule } from './components/pages/pages.module';
import { SettingsComponent } from './components/settings/settings.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { SocketCouple } from './providers/socket-couple.provider';
import { SocketDaysEmojis } from './providers/socket-days-emojis.provider';
import { SocketDaysPictures } from './providers/socket-days-pictures.providers';
import { SocketMessages } from './providers/socket-messags.providers';
import { SocketPublicProfile } from './providers/socket-public-profile.provider';
import { SocketSadness } from './providers/socket-sadness.provider';
import { SocketBattery } from './providers/socket-battery.provider';
import { SocketInvitation } from './providers/socket-invitation.provider';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot({ swipeBackEnabled: false }),
    AppRoutingModule,
    PagesModule,
    FormsModule,
    BrowserAnimationsModule,
    SettingsComponent,
    LottieModule.forRoot({ player: playerFactory }),
    ServiceWorkerModule.register('ngsw-worker.js',
      {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    { provide: "BASE_API_URL", useValue: environment.apiURL },
    { provide: "DEFAULT_TIMEOUT", useValue: 30_000 },

    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    SocketSadness, SocketCouple, SocketPublicProfile, SocketDaysEmojis, SocketDaysPictures, SocketMessages, SocketBattery, SocketInvitation
  ],
})
export class AppModule { }
