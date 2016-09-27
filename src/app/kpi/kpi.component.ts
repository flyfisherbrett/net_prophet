import { Component, Input, OnInit } from '@angular/core';
import { KpiService } from './kpi.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-kpi',
  templateUrl: 'kpi.component.html',
  styleUrls: ['kpi.component.css'],
  providers: [KpiService]
})
export class KpiComponent implements OnInit {
  options: any;
  kpiTitle: String;
  kpiExplanation: String;
  @Input() kpiType: String;

  constructor(private kpiService: KpiService, private us: UserService) {
    us.companySwitch.subscribe(id => {
      this.drawChart(id);
    });
  }

  drawChart(id: Number) {
    this.kpiService.getChartData(this.kpiType, id).subscribe(
      res => {
        let result = this.kpiService.getChart(this.kpiType, res.json().data);
        this.options = result.data;
        this.kpiTitle = result.title;
        this.kpiExplanation = result.explanation;
      }, err => { }
    );
  }

  ngOnInit() {
    this.drawChart(this.us.getCompany()['id']);
  }
}
