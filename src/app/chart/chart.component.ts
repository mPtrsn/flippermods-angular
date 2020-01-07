import {Component, OnInit} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  webSocketEndPoint: string = 'http://localhost:6565/ws';
  topic: string = '/topic/greetings/1';
  stompClient: any;

  data: string[] = [];

  json = {
    name: 'Moin Moin'
  };

  chart: any;

  constructor() {
  }

  ngOnInit() {
    console.log('Initialize WebSocket Connection');
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({},
      (frame) => this.stompClient.subscribe(this.topic, (msg) => this.data.push(msg)),
      (error) => console.error(error));

    this.chart = new Chart('canvas', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Tilt Sensor'
        },
      },
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        datasets: [
          {
            type: 'line',
            data: [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 4, 7, 2],
            backgroundColor: '#778899',
            fill: false
          }
        ]
      }
    });
  }


  sendMessage(id: number) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/hello/' + id, {}, JSON.stringify(this.json));
  }
}
