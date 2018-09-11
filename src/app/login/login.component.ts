import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any

  // logs a user into the app and issues a local token 
  login() {
    //console.log("login button")
    this.userService.login(this.user).subscribe((data: any) => {
      localStorage.setItem('token', data.token)
      this._flashMessagesService.show('You have Successfully Logged In',{ cssClass:'alert-success', timeout:3000 })
      this.router.navigate(['/home'])
    });
  }

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = {}
  }
}