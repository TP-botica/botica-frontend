import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DrugstoreLocation } from '../../../../domain/drugstore-product';
import { ServiceInfo } from '../../../../domain/service';
import { DrugstoreServiceView } from '../../../../domain/drugstore-service';
import { DrugstoreServiceService } from '../../../../service/drugstore-service.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../../service/service.service';

@Component({
  selector: 'app-map-2',
  templateUrl: './map-2.component.html',
  styleUrl: './map-2.component.css'
})
export class Map2Component {
  @ViewChild('divMap') divMap!: ElementRef;

  positions: DrugstoreLocation[] =[];
  service!: ServiceInfo;
  serviceDetail!: DrugstoreServiceView;
  visible: boolean = false;

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

  constructor(private drugstoreServiceService: DrugstoreServiceService, private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {
    const serviceId = this.route.snapshot.paramMap.get('serviceId');

    this.drugstoreServiceService.getDrugstoreLocations(serviceId).subscribe({
      next: (res) => {this.positions = res}
    })

    this.serviceService.getServiceById(serviceId).subscribe({
      next: (res) => {
        this.service = res;
      }
    })

  }

  markerClick(drugstoreId: any) {
    this.drugstoreServiceService.getDetailsById(drugstoreId, this.route.snapshot.paramMap.get('serviceId')).subscribe({
      next: (res) =>{
        this.serviceDetail = res
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

}