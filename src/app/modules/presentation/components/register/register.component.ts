import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../domain/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  roles: Role[] | undefined;

  selectedRole: Role | undefined;

  ngOnInit() {
      this.roles = [
          { name: 'Cliente', id: 'C' },
          { name: 'Botica', id: 'B' },
      ];
  }

  register(){
    console.log(this.selectedRole)
  }
}
