import { Component } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { UserEdit } from '../../../../domain/user-edit';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  user: UserEdit = {
    name: '',
    email:'',
    role: ''
  }

  constructor(private userService:UserService){
    userService.validateRole(localStorage.getItem("token")).subscribe((res)=>{
        this.user.name = res.name;
        this.user.email = res.email;
        this.user.role = res.role;
    })
  }
}
