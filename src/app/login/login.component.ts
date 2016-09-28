import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private us: UserService, private router: Router) {
    if (this.us.isLoggedIn()) { this.router.navigate(['/dashboard']); }
  }

  login(event, email, password) {
    event.preventDefault();
    this.us.login(email, password);
  }
}
