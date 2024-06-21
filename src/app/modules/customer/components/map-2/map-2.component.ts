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

  //mapa!: google.maps.Map;
  //markers: google.maps.Marker[];
  positions: DrugstoreLocation[] =[];
  service!: ServiceInfo;
  serviceDetail!: DrugstoreServiceView;
  visible: boolean = false;


  constructor(private renderer: Renderer2,private drugstoreServiceService: DrugstoreServiceService, private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {
    const serviceId = this.route.snapshot.paramMap.get('serviceId');

    this.drugstoreServiceService.getDrugstoreLocations(serviceId).subscribe({
      next: (res) => {this.positions = res
        //this.showMap();
      }
    })

    this.serviceService.getServiceById(serviceId).subscribe({
      next: (res) => {
        this.service = res;
      }
    })

    //this.markers = [];
  }

  /*showMap(): void {
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await this.loadMap(position);
      }, null, opciones);
    } else {
      console.log("navegador no compatible");
    }
  };

  private loadMap(position: any): any {
    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones);
  
    // Inicialmente cargar el mapa con un marcador en la posición dada
    const initialMarker = new google.maps.Marker({
      position: opciones.center,
      map: this.mapa,
      animation: google.maps.Animation.DROP
    });
    this.markers.push(initialMarker);
    const iconUrl = 'logo.png'; 
    // Cargar las posiciones de las boticas en el mapa
    this.positions.forEach(position => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(position.latitude), parseFloat(position.longitude)),
        map: this.mapa,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(32, 32), // Ajusta el tamaño del icono
          // Puedes agregar ancho y alto personalizados aquí
          size: new google.maps.Size(64, 64), // Tamaño original de la imagen
          origin: new google.maps.Point(0, 0), // El punto de origen (0, 0) es la esquina superior izquierda de la imagen
          anchor: new google.maps.Point(16, 32) // El punto de anclaje, donde el marcador apunta (en este caso, en el centro inferior)
        },
          title: position.name,
      });

      // Agregar evento click al marcador
      google.maps.event.addListener(marker, 'click', () => {
        this.drugstoreServiceService.getDetailsById(position.drugstoreId, this.route.snapshot.paramMap.get('serviceId')).subscribe({
          next: (res) =>{
            this.serviceDetail = res
            this.visible = true
            }
        })
      });

      this.markers.push(marker);
    });
  }*/
}