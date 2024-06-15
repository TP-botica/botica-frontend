import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/product.service';
import { Purchase, PurchaseDetail } from '../../../../domain/purchase';
import { PurchaseService } from '../../../../service/purchase.service';
import { PurchaseDetailService } from '../../../../service/purchase-detail.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
  basicData: any;
  purchases!: Purchase[];
  basicOptions: any;

  data: any;

  options: any;

  purchase!: Purchase;
  purchaseDialog: boolean = false;
  purchaseDetails!: PurchaseDetail[];

  constructor(private purchaseService: PurchaseService, private purchaseDetailService: PurchaseDetailService){
  }

  ngOnInit() {
    this.purchaseService.getMyPurchases(localStorage.getItem('profileId')).subscribe(
        {
            next: (res) => {this.purchases = res}
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
