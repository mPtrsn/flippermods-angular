import {Component, OnInit} from '@angular/core';
import {Profile, ProfileInfo} from '../Model/Profile';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {ApiService} from '../api.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css']
})
export class StartMenuComponent implements OnInit {
  username = '';
  password = '';

  flipped = false;

  constructor(private authService: AuthenticationService,
              public router: Router,
              private apiService: ApiService) {
  }

  ngOnInit() {
  }

  onKeyUsername(event: any) {
    this.username = event.target.value;
  }

  onKeyPassword(event: any) {
    this.password = event.target.value;
  }

  onSubmit() {
    const info: ProfileInfo = {
      username: this.username,
      passwordMD5: this.password
    };
    this.authService.login(info).subscribe((value: Profile) => {
      if (value) {
        this.router.navigate(['/chart', value.id]);
      }
    });
  }

  flipCard() {
    this.flipped = !this.flipped;
  }

  register() {
    const info: ProfileInfo = {
      username: this.username,
      passwordMD5: this.password
    };
    const md5: Md5 = new Md5();
    info.passwordMD5 = md5.appendStr(info.passwordMD5).end().toString();

    this.apiService.register(info).subscribe(
      regProfile =>
        this.authService.login(info).subscribe(
          (value: Profile) => {
            if (value) {
              this.router.navigate(['/chart', value.id]);
            }
          }
        )
    );
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.flipped) {
        this.register();
      } else {
        this.onSubmit();
      }

    }
  }
}
