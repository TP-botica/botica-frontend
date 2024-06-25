import { Component } from '@angular/core';

@Component({
  selector: 'app-drugstore-home',
  templateUrl: './drugstore-home.component.html',
  styleUrl: './drugstore-home.component.css'
})
export class DrugstoreHomeComponent {
  name = localStorage.getItem('name')

}
