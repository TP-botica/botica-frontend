import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-purchase-success',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './purchase-success.component.html',
  styleUrl: './purchase-success.component.css'
})
export class PurchaseSuccessComponent {
  constructor(private router: Router){

  }

  return(){
    this.router.navigate(['/customer'])
  }
}
