import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Mate } from '../models/mate.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import AccessToken from './models/access-token.model';
import LoginResponseDTO from './dto/login-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly currentUserSubject: BehaviorSubject<Mate>;
  public readonly loggedInSubject: BehaviorSubject<boolean>;
  public readonly currentUser: Observable<Mate>;
  private accessToken?: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.currentUserSubject = new BehaviorSubject<Mate>(JSON.parse(localStorage.getItem("currentUser")!));
    this.loggedInSubject = new BehaviorSubject(localStorage.getItem("loggedIn") === "true");
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private tokenWaiter?: Promise<string>;

  logout() {
    delete this.accessToken;
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedIn");
    this.loggedInSubject.next(false);
    this.currentUserSubject.next(undefined!);
    this.http.get("auth/logout").subscribe();
    this.router.navigate(["login"]);
  }

  public async isLoggedIn() { 
    try {
      return !!(await this.getAccessToken())?.length
    } catch (error) {
      return false
    }
  }

  public async getAccessToken() : Promise<string | undefined> {
    if(!this.loggedInSubject.value)
      return undefined

    let previousWaiter = this.tokenWaiter;

    return this.tokenWaiter = (async () => {
      await previousWaiter;
      try {
        if(!this.accessToken?.length || jwtDecode<AccessToken>(this.accessToken).exp - Date.now()/1000 < 35)
          await this.refresh();

        return this.accessToken!;
      } catch (e) {
        delete this.tokenWaiter;
        throw e;
      }
    })()
  }

  async refresh() {
    this.accessToken = (await lastValueFrom(this.http.get<{ accessToken: string }>("auth/refresh")))?.accessToken;
    await this.setLoggedIn();
  }

  async setLoggedIn() {
    this.loggedInSubject.next(true);
    localStorage.setItem("loggedIn", "true");

    if(!this.currentUserSubject.value)
      await this.refreshUser();
  }

  async refreshUser() {
    this.currentUserSubject.next(await lastValueFrom(this.http.get<Mate>("mates/me")));
    localStorage.setItem("currentUser", JSON.stringify(this.currentUserSubject.value));
  }

  async login(username: string, password: string) {
    const response = await lastValueFrom(this.http.post<LoginResponseDTO>("auth/login", {username, password}));
    this.accessToken = response.accessToken;
    await this.setLoggedIn();
    return this.accessToken;
  }
}