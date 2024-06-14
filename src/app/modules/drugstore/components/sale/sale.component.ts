import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/product.service';
import { PurchaseService } from '../../../../service/purchase.service';
import { Purchase } from '../../../../domain/purchase';

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

  constructor(private purchaseService: PurchaseService){
    this.getData()
  }

  ngOnInit() {
    this.purchaseService.getMySales(localStorage.getItem('profileId')).subscribe(
        {
            next: (res) => {this.sales = res}
        }
    );
  }

  getData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: ['Jarabes', 'Pastillas', 'Otros'],
      datasets: [
          {
              data: [540, 325, 702],
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
      ]
    };

  this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
          {
              label: 'Ventas',
              data: [540, 325, 702, 620],
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
          }
      ]
  };

  this.options = {
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                color: textColor
            }
        }
    }
};

  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  }

  editProduct(purchase: Purchase) {
    this.purchase = { ...purchase };
    this.purchaseDialog = true;
}

hideDialog() {
    this.purchaseDialog = false;}
}
