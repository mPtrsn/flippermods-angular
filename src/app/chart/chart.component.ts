import {Component, OnInit} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Chart} from 'chart.js';
import {Message} from 'stompjs';
import {DataPackage} from '../Model/DataPackage';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  webSocketEndPoint: string = environment.webSocketEndPoint;
  topic: string = '/topic/data/';
  stompClient: Stomp.Client;

  data: string[] = [];

  json = {
    name: 'Moin Moin'
  };

  chart: Chart;

  constructor(private route: ActivatedRoute) {
  }

  onData(msg: Stomp.Message) {
    const pack: DataPackage = JSON.parse(msg.body);
    console.log(pack);

    this.chart.data.datasets.forEach((dataset) => {

      if (dataset.data.length >= 21) {
        dataset.data.shift();
      }
      dataset.data.push(pack.number);

    });

    this.chart.update();

  }

  ngOnInit() {
    console.log('Initialize WebSocket Connection');

    const id = +this.route.snapshot.paramMap.get('id');

    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({},
      (frame) => this.stompClient.subscribe(this.topic + id, (msg: Stomp.Message) => this.onData(msg)),
      (error) => console.error(error));

    this.chart = new Chart('canvas', {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 1000,
              min: 0
            }
          }]
        },
        responsive: true,
        title: {
          display: false,
          text: 'Tilt Sensor'
        },
        lineTension: 0,
      },
      data: {
        labels: ['-10', '-9,5', '-9', '-8,5', '-8', '-7,5', '-7', '-6,5', '-6', '-5,5', '-5',
          '-4,5', '-4', '-3,5', '-3', '-2,5', '-2', '-1,5', '-1', '-0,5', '0'],
        datasets: [
          {
            type: 'line',
            backgroundColor: '#cc4811',
            fill: true,
            label: 'Tilt-Sensor'
          }
        ]
      }
    });
  }
}
