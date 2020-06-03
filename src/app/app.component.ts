import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  navigateHome() {
    // clear local storage
    this.authService.logout();

    // navigate
    this.router.navigate(['']);
  }
}
