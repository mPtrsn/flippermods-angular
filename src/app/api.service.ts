import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Profile, ProfileInfo} from './Model/Profile';
import {Md5} from 'ts-md5';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  loginProfile(info: ProfileInfo): Observable<Profile> {

    const md5: Md5 = new Md5();
    info.passwordMD5 = md5.appendStr(info.passwordMD5).end().toString();
    console.log(info.passwordMD5);
    return this.http.post<Profile>('localhost:6565/user/login', info);
  }
}
