import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { ArApService } from './ar-ap.service';

@Component({
    selector: 'app-ar-ap',
    templateUrl: 'ar-ap.component.html',
    styleUrls: ['ar-ap.component.css'],
    providers: [ArApService]
})
export class ArApComponent {
    customers = [];
    vendors = [];
    vTotal = 0;
    cTotal = 0;

    constructor(private us: UserService, private arAp: ArApService) {

        this.getData(us.getCompany()['id']);
        us.companySwitch.subscribe(id => {
            this.getData(id);
        });

    }

    getData(id) {
        this.arAp.getReportData(id, 'AgedPayables').subscribe(res => {
            let response = res.json().data.resources;
            this.vendors = response.map(obj => {
                let vendor = { name: '', balance: 0 };
                vendor.name = obj.name;
                vendor.balance = obj.Total;
                return vendor;
            });
            this.vTotal = this.vendors.reduce((memo, ven) => {
                return memo + parseFloat(ven.balance);
            }, 0);
        });

        this.arAp.getReportData(id, 'AgedReceivables').subscribe(res => {
            let response = res.json().data.resources;
            this.customers = response.map(obj => {
                let customer = { name: '', balance: 0 };
                customer.name = obj.name;
                customer.balance = obj.Total;
                return customer;
            });
            this.cTotal = this.customers.reduce((memo, cus) => {
                return memo + parseFloat(cus.balance);
            }, 0);
        });
    }

}
