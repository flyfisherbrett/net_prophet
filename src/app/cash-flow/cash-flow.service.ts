import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class CashFlowService {
  constructor (private http: Http) {}

  getChartData (id) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('report_type', 'CashFlow');
    return this.http.get(environment.apiEndpoint + 'api/companies/' + id + '/cash_flow', {headers: headers});
  }

}
