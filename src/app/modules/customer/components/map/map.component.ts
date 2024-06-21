import { Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { DrugstoreLocation, DrugstoreProductView } from '../../../../domain/drugstore-product';
import { DrugstoreProductService } from '../../../../service/drugstore-product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../service/product.service';
import { ProductInfo, ProductShoppingCart } from '../../../../domain/product';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { GoogleMap, MapMarker } from '@angular/google-maps';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;


  positions: DrugstoreLocation[] =[];
  product!: ProductInfo;
  productDetail!: DrugstoreProductView;
  visible: boolean = false;
  drugstoreId!: string;

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerOptions2!: google.maps.MarkerOptions
  markerPosition: google.maps.LatLngLiteral = this.center;

  iconSize: google.maps.Size = {
    width: 40,
    height: 40,
    equals: function(other: google.maps.Size): boolean {
      return this.width === other.width && this.height === other.height;
    }
  };

  ngAfterViewInit(){
    this.setCurrentLocation()
  }

  constructor(private drugstoreProductService: DrugstoreProductService, private route: ActivatedRoute,
    private productService: ProductService, private shoppingCartService: ShoppingCartService
  ) {
    const productId = this.route.snapshot.paramMap.get('productId');

    this.drugstoreProductService.getDrugstoreLocations(productId).subscribe({
      next: (res) => {this.positions = res}
    })

    this.productService.getProductById(productId).subscribe({
      next: (res) => {
        this.product = res;
      }
    })

  }

  markerClick(drugstoreId: any) {
    this.drugstoreProductService.getDetailsById(drugstoreId, this.route.snapshot.paramMap.get('productId')).subscribe({
      next: (res) =>{
        this.productDetail = res
        this.visible = true
        }
    })
  }

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.markerPosition = this.center;
      });
    }
  }


  addtoCart(){
    this.visible = false
    const product: ProductShoppingCart = {
      id: this.route.snapshot.paramMap.get('productId'),
      name: this.product.name,
      drugstoreId: this.drugstoreId,
      drugstore: this.productDetail.drugstore,
      price: this.productDetail.price,
      imageUrl: this.product.imageUrl,
      category: this.product.category,
      stock: this.productDetail.stock,
      quantity: 1
    }
    this.shoppingCartService.addToCart(product);

  }
}