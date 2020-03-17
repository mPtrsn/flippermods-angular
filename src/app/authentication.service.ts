import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Profile, ProfileInfo} from './Model/Profile';
import {map} from 'rxjs/operators';
import {useAnimation} from '@angular/animations';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Profile>;
  public currentUser: Observable<Profile>;

  constructor(private http: HttpClient, public router: Router) {
    this.currentUserSubject = new BehaviorSubject<Profile>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Profile {
    return this.currentUserSubject.value;
  }

  login(info: ProfileInfo): Observable<Profile> {
    const username = info.username;
    const passwordMD5 = info.passwordMD5;
    return this.http.post<Profile>(`${environment.host}/user/login`, {username, passwordMD5})
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authData = window.btoa(info.username + ':' + info.passwordMD5);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        console.log('pipe');
        this.router.navigate(['/chart/', 1]);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
