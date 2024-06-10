import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { UserLogin } from '../../../../domain/user-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: UserLogin = {
    email:'',
    password: ''
  }

  constructor(private userService: UserService,private router: Router,){

  }

  login(){
    this.userService.authorize(this.user).subscribe(
      {
        next: (res:any) => {
          localStorage.setItem('token', res.jwt)
          this.userService.validateRole(res.jwt).subscribe(
            {
              next: (res:any) => {
                if(res.roleEnum == 'ROLE_CUSTOMER')
                  this.router.navigate(['/customer']);
                if(res.roleEnum == 'ROLE_DRUGSTORE')
                  this.router.navigate(['/drugstore']);
              }
            }
          )
        },
        error: (err) => console.log(err)
      }
    );
  }

  isValid(){
    return !this.user.email && !this.user.password;
  }
}
