import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  companies = [];
  currentCompany = '';

  constructor(public router: Router, private userService: UserService) {
    this.companies = userService.getCompanies();
    if (this.userService.getCompany()) {
      this.currentCompany = this.userService.getCompany()['name'];
    }

    this.userService.loggedIn.subscribe(val => {
      val ? this.setCompanies() : this.companies = [];
    });

    this.userService.companySwitch.subscribe(c => {
      this.currentCompany = this.userService.getCompany()['name'];
    });
  }

  logCompanies(e) {
    e.preventDefault();
    console.log(this.userService.getCompanies());
    console.log(this.selectedCompany());
  }

  logout(event) {
    event.preventDefault();
    this.userService.logout();
  }

  selectCompany(e, company) {
    e.preventDefault();
    this.userService.changeCompany(company);
    this.currentCompany = company.name;
  }

  setCompanies() {
    this.companies = this.userService.getCompanies();
    this.currentCompany = this.userService.getCompany()['name'];
  }

  selectedCompany() {
    return this.userService.getCompany();
  }

  getCompanies() {
    return this.userService.getCompanies();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  prepareDropdownCompanies() {
    let comps = this.getCompanies();
    let selectedCompany = this.selectedCompany();
    let removedSelected = comps.filter(c => {
      return c.id !== selectedCompany.id;
    });
    return removedSelected.unshift(selectedCompany);
  }

}
