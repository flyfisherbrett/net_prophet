import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-not-found',
  templateUrl: 'not-found.component.html',
  styles: [`
    #not-found {
        margin-top: 60px;
    }
  `]
})
export class NotFoundComponent {

    constructor (private us: UserService) {}

    isLoggedIn() {
        return this.us.isLoggedIn();
    }
}
