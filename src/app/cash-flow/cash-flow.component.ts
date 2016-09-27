import { Component } from '@angular/core';
import { CashFlowService } from './cash-flow.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Highcharts } from 'angular2-highcharts';

@Component({
    selector: 'app-cash-flow',
    templateUrl: 'cash-flow.component.html',
    styleUrls: ['cash-flow.component.css'],
    providers: [CashFlowService]
})

export class CashFlowComponent {
    options: any; // HighstockOptions;
    data: any;
    currentBalance: Number;
    oneWeekBalance: Number;
    arApData = {};

    constructor(private cashFlowService: CashFlowService, private router: Router, private us: UserService) {

        this.arApData = {customers: [{name: 'test', balance: 220.56}]};

        Highcharts.setOptions({
            lang: { thousandsSep: ',' }
        });

        this.us.companySwitch.subscribe(id => {
            this.generateChart(id);
        });

        this.generateChart(this.us.getCompany()['id']);
    }

    generateChart(id) {
        this.cashFlowService.getChartData(id).subscribe(
          res => {
            this.data = res.json().data;
            this.drawChart();
          },
          err => {
            console.log('found it', err.json());
            // this.us.logout(); do something better when chart data does not return
          }
        );
    }

    drawChart() {
        this.currentBalance = this.data.actual[this.data.actual.length - 1][1];
        this.oneWeekBalance = this.data.total.data[6][1];
        this.data.total.data.unshift(this.data.actual[this.data.actual.length - 1]);

        this.options = {
            yAxis: {
                title: 'Cash',
                startOnTick: false
            },
            xAxis: {
                type: 'datetime',
                plotBands: [{
                    from: this.data.total.data[1][0],
                    to: this.data.total.data[this.data.total.data.length - 1][0],
                    color: 'rgba(68, 170, 213, .15)'
                }],
                ordinal: false
            },
            rangeSelector: {
                selected: 1,
                inputEnabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                area: {
                    color: '#a5d6a7',
                    fillColor: 'rgba(65, 135, 63, 0.25)',
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    }
                }
            },
            series: [{
                type: 'area',
                id: 'cash',
                name: 'Balance',
                tooltip: {
                    pointFormat: 'Balance: ${point.y:,.2f}',
                    useHTML: true
                },
                data: this.data.actual.concat(this.data.total.data)
            }, {
                type: 'flags',
                onSeries: 'cash',
                data: this.data.flags.reduce((memo, flag) => {
                    let match = memo.filter(f => { return flag.x === f.x; })[0];
                    if (match) {
                        let i = memo.indexOf(match);
                        match.title = 'Multi';
                        match.text = '<p>' + match.text + '</p><br><p>' + flag.description + '</p>';
                        memo[i] = match;
                    } else {
                        memo.push({
                            x: flag.x,
                            title: flag.title,
                            text: flag.description
                        });
                    }
                    return memo;
                }, [])
            }
            ]
        };
    }
};
