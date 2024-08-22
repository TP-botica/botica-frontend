import { Component } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { UserEdit } from '../../../../domain/user-edit';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
  providers: [MessageService, ConfirmationService]
})
export class EditProfileComponent {

  user: UserEdit = {
    name: '',
    email:'',
    role: ''
  }
  visible: boolean = false;

  constructor(private userService:UserService){
    this.loadUser();
  }

  loadUser(){
    this.userService.validateRole().subscribe((res)=>{
      this.user.name = res.name;
      this.user.email = res.email;
      this.user.role = res.role;
  })
  }

  showDialog() {
    this.visible = true;
}

  updateUser(){
    this.userService.updateUser(localStorage.getItem("profileId"), this.user).subscribe(()=>{
      this.loadUser()
      this.visible = false
    })
  }
}
