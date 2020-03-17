import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService,
              public router: Router) {
  }

  canActivate() {
    console.log('auth guard');
    if (isNullOrUndefined(this.authService.currentUserValue)) {
      console.error('not logged in');
      this.router.navigateByUrl('/home');
      return false;
    } else {
      return true;
    }
  }
}
