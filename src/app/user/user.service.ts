import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class UserService {
  loggedIn = new Subject<Boolean>();
  companySwitch = new Subject<Number>();

  constructor(private http: Http, private router: Router) {
    this.loggedIn.next(false);
  }

  login(email, password) {
    let creds = { email: email, password: password };

    this.http.post(environment.apiEndpoint + 'api/sessions', creds)
      .subscribe(
        res => {
          localStorage.setItem('token', res.json().user.access_token);
          this.loadSessionData(res.json());
          this.loggedIn.next(true);
          this.router.navigate(['dashboard']);
        }, err => {
            console.log(err);
          alert(err.json().messages);
        }
      );
  }

  loadSessionData(data) {
    let adminCompanyIds = data.employees.reduce( (memo, emp) => {
      if (emp.role === 'admin') { memo.push(emp.company_id); }
      return memo;
    }, []);
    let companies = data.companies.filter( comp => {
      return adminCompanyIds.includes(comp.id);
    });
    if (!this.getCompany()) { this.changeCompany(companies[0]); }
    localStorage.setItem('companies', JSON.stringify(companies));
  }

  changeCompany(company: Object) {
    localStorage.setItem('company', JSON.stringify(company));
    this.companySwitch.next(company['id']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('companies');
    localStorage.removeItem('company');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  getCompanies() {
    let comps = JSON.parse(localStorage.getItem('companies'));
    if (comps) {
      return JSON.parse(localStorage.getItem('companies')).sort((a, b) => {
        return ((a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0)); // sort companies by name
      });
    }
  }

  getCompany() {
    return JSON.parse(localStorage.getItem('company'));
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
