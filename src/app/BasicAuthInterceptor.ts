import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('hallo');
    // add authorization header with basic auth credentials if available
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.authData) {
      req = req.clone({
        setHeaders: {
          Authorization: `Basic ${currentUser.authData}`
        }
      });
    }

    return next.handle(req);
  }

}
