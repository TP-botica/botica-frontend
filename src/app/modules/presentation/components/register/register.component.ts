import { Component } from '@angular/core';
import { Role } from '../../../../domain/role';
import { RoleService } from '../../../../service/role.service';
import { UserRegister } from '../../../../domain/user-register';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: UserRegister = {
    name: '',
    email:'',
    password: '',
    repeatedPassword:'',
    latitude: '',
    longitude:'',
    roleId: ''
  }

  roles: Role[] | undefined;

  selectedRole: Role | undefined;
  constructor(roleService: RoleService, private userService: UserService, private router: Router){
    roleService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res
      }
    })
  }


  register(){
    if(this.selectedRole)
     {
      this.user.roleId = this.selectedRole.id;
      this.userService.register(this.user).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        error: (err) => {console.log(err)}
      })
     }
  }
}
