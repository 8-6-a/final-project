import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any

  register() {
    this.userService.register(this.user).subscribe((data: any) => {
      localStorage.setItem('token', data.token)
      this._flashMessagesService.show('You have Successfully Registered, Please login',{ cssClass:'alert-success', timeout:3000 })
      console.log("Registered New User")
      this.router.navigate(['/login'])
    });   
  }

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private userService: UserService,
    ) {

  }

  ngOnInit() {
    this.user = {}
  }

}