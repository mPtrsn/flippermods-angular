import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Profile, ProfileInfo} from './Model/Profile';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Profile>;
  public currentUser: Observable<Profile>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Profile>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Profile {
    return this.currentUserSubject.value;
  }

  login(info: ProfileInfo) {
    const username = info.username;
    const password = info.passwordMD5;
    return this.http.post<Profile>(`${environment.host}/user/login`, { username, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authData = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
