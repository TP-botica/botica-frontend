import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../../../service/purchase.service';
import { Purchase, PurchaseDetail } from '../../../../domain/purchase';
import { PurchaseDetailService } from '../../../../service/purchase-detail.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css',
  providers: []
})
export class SaleComponent implements OnInit {
  basicData: any;
  sales!: Purchase[];
  basicOptions: any;

  data: any;

  options: any;

  purchase!: Purchase;
  purchaseDialog: boolean = false;
  purchaseDetails!: PurchaseDetail[];

  constructor(private purchaseService: PurchaseService, private purchaseDetailService: PurchaseDetailService){
  }

  ngOnInit() {
    this.purchaseService.getMySales(localStorage.getItem('profileId')).subscribe(
        {
            next: (res) => {this.sales = res}
        }
    );
  }

  editProduct(purchase: Purchase) {
    this.purchase = { ...purchase };
    this.purchaseDetailService.getPurchaseDetails(this.purchase.id).subscribe({
      next: (res) => {
        this.purchaseDetails = res
        this.purchaseDialog = true
      },
      error: (err) => {console.log(err)}
    })

}

hideDialog() {
    this.purchaseDialog = false;}
}
