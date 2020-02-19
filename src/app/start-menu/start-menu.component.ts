import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css']
})
export class StartMenuComponent implements OnInit {
  values = '';

  constructor() {
  }

  ngOnInit() {
  }

  onKey(event: any) {
    this.values += event.target.value;
  }

}
