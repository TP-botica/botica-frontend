import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { UserLogin } from '../../../../domain/user-login';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private userService: UserService,private router: Router,
    private messageService: MessageService, private fb: FormBuilder
  ){

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(){
    this.userService.authorize(this.loginForm.value).subscribe(
      {
        next: (res:any) => {
          localStorage.setItem('token', res.jwt)
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Login exitoso', life: 3000 });
          this.userService.validateRole().subscribe(
            {
              next: (res:any) => {
                if(res.role == 'ROLE_CUSTOMER')
                  this.router.navigate(['/customer']);
                if(res.role == 'ROLE_DRUGSTORE')
                  this.router.navigate(['/drugstore']);
              }
            }
          )
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Datos incorrectos', life: 3000 })
        }
      }
    );
  }

  isValid(){
    return this.loginForm.invalid;
  }
}
