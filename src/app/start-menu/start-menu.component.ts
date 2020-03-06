import {Component, OnInit} from '@angular/core';
import {Md5} from 'ts-md5';
import {ApiService} from '../api.service';
import {Profile, ProfileInfo} from '../Model/Profile';
import {isNullOrUndefined} from 'util';
import {Navigation, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css']
})
export class StartMenuComponent implements OnInit {
  username = '';
  password = '';

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onKeyUsername(event: any) {
    this.username += event.target.value;
  }
  onKeyPassword(event: any) {
    this.password += event.target.value;
  }

  onSubmit() {
    const info: ProfileInfo = {
      username: this.username,
      passwordMD5: this.password
    };
    this.authService.login(info).subscribe((value: Profile) => {
      if (value) {
        this.router.navigate([`/chart/${value.id}`]);
      }
    });
  }

}
