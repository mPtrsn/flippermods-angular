import {Component, OnInit} from '@angular/core';
import {Profile, ProfileInfo} from '../Model/Profile';
import {Router} from '@angular/router';
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
              public router: Router) {
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

}
