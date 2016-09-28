import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class KpiService {
    options: HighchartsOptions;
    constructor(private http: Http) { }

    getChartData(kpiType, companyId) {
        let reportUrls = {
            'quickRatio': 'api/companies/' + companyId + '/reports?report_type=BalanceSheet',
            'currentRatio': 'api/companies/' +
                            companyId +
                            '/account_entries?report_type=financial_ratios_cash_flow_solvency&slug=current_ratio',
            'profitAsSales': 'api/companies/' + companyId + '/reports?report_type=ProfitAndLoss'
        };
        let url = reportUrls[kpiType];
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(
            environment.apiEndpoint + url,
            { headers: headers });
    }

    quickRatio(data) {
        return  {
            chart: { type: 'column'},
            title: 'Test',
            credits: { enabled: false },
            xAxis: {
                categories: [new Date().getFullYear()]
            },
            tooltip: {
                pointFormat: 'QR: {point.y}'
            },
            series: [
                {
                    name: 'Your QR',
                    data: [data.quick_ratio],
                    color: 'rgb(65, 135, 63)'
                },
                {
                    name: 'Industry QR',
                    data: [data.industry_quick_ratio],
                    color: 'rgb(149, 206, 255)'
                }
            ]
        };
    }

    currentRatio(data) {
        let industryD = data[0].data ? data[0].data.pop() : 0;
        let companyD = data[1].data ? data[1].data.pop() : 0;
        return  {
            chart: { type: 'column'},
            title: 'Test',
            credits: { enabled: false },
            xAxis: {
                categories: [new Date().getFullYear()]
            },
            series: [
                {
                    name: 'Your CR',
                    data: [companyD],
                    color: 'rgb(65, 135, 63)'
                },
                {
                    name: 'Industry CR',
                    data: [industryD],
                    color: 'rgb(149, 206, 255)'
                }
            ]
        };
    }

    profitAsSales(data) {
        let pMargin = Math.round((data.net_income / data.total_income) * 100);
        if (data.net_income < 0) { pMargin = 0; }
        return  {
            chart: { type: 'pie'},
            title: '',
            credits: { enabled: false },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: { enabled: false },
                    showInLegend: true
                }
            },
            series: [
                {
                    data: [{
                        name: 'Profit',
                        title: '',
                        y: pMargin,
                        sliced: true,
                        selected: true,
                        color: 'rgb(65, 135, 63)'
                    }, {
                        name: 'Consumed Income',
                        title: '',
                        y: (100 - pMargin),
                        color: 'rgb(183,28,28)'
                    }]
                }
            ]
        };
    }

    getChart(kpiType, data) {
        let result: any = {};
        if (kpiType === 'quickRatio') {
            result = {
                title: 'Quick Ratio',
                explanation: `Quick Ratio is a liquidity ratio that compares current liquid assests to liabilities.
                    A healthly quick ratio is > 1.5, meaning a company has 1.5 assets for each liability.
                    A ratio < 1 means the company does not have enough assets to cover their liabilities.`,
                data: this.quickRatio(data)
            };
        } else if (kpiType === 'currentRatio') {
            result = {
                title: 'Current Ratio',
                explanation: `The Current Ratio is a liquidity ratio that measures your company's ability to pay short-term
                    and long-term obligations. To gauge this ability, the Current Ratio considers the current total
                    assets of your company (both liquid and illiquid) relative to its current total liabilities.`,
                data: this.currentRatio(data)
            };
        } else if (kpiType === 'profitAsSales') {
            result = {
                title: 'Profit Margin',
                explanation: 'This chart shows you what percentage of your income is consumed by expenses.',
                data: this.profitAsSales(data)
            };
        }
        return result;
    }

}
