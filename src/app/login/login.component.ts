import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: any
  header: any

  // logs a user into the app and issues a local token 
  login() {
    this.userService.login(this.user).subscribe((res: any) => {
      if(!res.token) {
        this.header = res;
      } else {
        this.header = 'Success!'
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home'])
      }
    });
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = {}
    this.header = 'Login'
  }
}