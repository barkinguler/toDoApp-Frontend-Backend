import { Component, OnInit } from '@angular/core';

import { webSocket } from 'rxjs/webSocket';
import { Irealtime } from 'src/app/Imodel/Irealtime';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public chartType: string = 'bar';
  public chartLabel: string[] = [];
  barChartData: any;
  value: number;

  chartFilled() {
    this.chartLabel.push('Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange');

    this.barChartData = [
      { data: [this.value, 22, 32, 42, 52, 62, 72], label: 'Value 1' },
    ];
  }

  chartOptions = {
    tooltips: {
      display: true,
      backgroundColor: '#fff',
      titleFontSize: 14,
      titleFontColor: 'chocolate',
      bodyFontColor: '#000',
      bodyFontSize: 12,
      displayColors: false,
    },

    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    responsive: true,
    legend: {
      display: true,
      position: 'top',
      cornerRadius: 10,
      titleSpacing: 4,
      footerFontStyle: 'bold',
      multiKeyBackground: '#eee',
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Veri',
          },
        },
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true,
            userCallback: function (label, index, labels) {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
          scaleLabel: {
            display: true,
            labelString: 'İş Sayıları',
          },
        },
      ],
    },
  };

  constructor(private modelservice: ModelServiceService) {}

  ngOnInit(): void {
    this.chartFilled();

    this.modelservice.getIstatistic().subscribe((posts) => {
      const tmpbar = [];
      const tmpchart = [];
      console.log(posts.length);
      for (let i = 0; i < posts.length; i++) {
        tmpbar.push(posts[i].workvalue);
        tmpchart.push(posts[i].username);
      }

      this.chartLabel = tmpchart;
      this.barChartData = [{ data: tmpbar, label: 'İş Hacmi' }];
    });
    console.log(this.modelservice.getIstatisticValue().length);
    console.log(Object.keys(this.modelservice.getIstatisticValue()).length);

    const WebSocketSubject = webSocket({
      url: 'ws://localhost:8008/name',
      deserializer: (msg) => {
        const res = msg;
        const tmp: Array<Irealtime> = JSON.parse(msg.data);

        this.chartLabel = [];
        this.barChartData = [];
        const tmpbar = [];
        const tmpchart = [];
        for (let i = 0; i < tmp.length; i++) {
          tmpbar.push(tmp[i].workvalue);
          tmpchart.push(tmp[i].username);
        }

        this.chartLabel = tmpchart;
        this.barChartData = [{ data: tmpbar, label: 'İş Hacmi' }];
      },
    });
    WebSocketSubject.subscribe((data) => {});
  }

  initView(tmp: Array<any>) {
    const tmpbar = [];
    const tmpchart = [];
    console.log(Object.keys(tmp).length);
    for (let i = 0; i < Object.keys(tmp).length; i++) {
      tmpbar.push(tmp[i].workvalue);
      tmpchart.push(tmp[i].username);
    }

    this.chartLabel = tmpchart;
    this.barChartData = [{ data: tmpbar, label: 'İş Hacmi' }];
  }
}
