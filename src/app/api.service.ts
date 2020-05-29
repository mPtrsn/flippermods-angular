import {Injectable} from '@angular/core';
import {Profile, ProfileInfo} from './Model/Profile';
import {Md5} from 'ts-md5';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public loginProfile(info: ProfileInfo): Observable<Profile> {

    const md5: Md5 = new Md5();
    info.passwordMD5 = md5.appendStr(info.passwordMD5).end().toString();
    console.log(info.passwordMD5);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.post<Profile>(`${environment.host}/user/login`, info, {headers});
  }

  public register(info: ProfileInfo) {
    return this.http.put<Profile>(`${environment.host}/user`, info);
  }
}
