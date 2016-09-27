import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private us: UserService) {

  }

  login(event, email, password) {
    event.preventDefault();
    this.us.login(email, password);
  }
}
