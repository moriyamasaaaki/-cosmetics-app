import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, RadialChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['10代', '20代', '30代', '40代', '50代'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [64, 78, 42, 29, 13], label: '肌に気を遣っているか？' }
  ];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['乾燥肌', 'オイリー肌', '混合肌',
    '敏感肌', 'ニキビ肌'];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4], label: '男性の肌質' }
  ];
  public radarChartType: ChartType = 'radar';
  ngOnInit() {
  }

}
