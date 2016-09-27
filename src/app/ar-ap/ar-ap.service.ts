import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ArApService {

    constructor(private http: Http) { }

    getReportData(id, reportType) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get(environment.apiEndpoint + 'api/companies/' + id + '/reports?report_type=' + reportType, {headers: headers});
    }

}
