///<reference path="../../../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Role } from '../../../../domain/role';
import { RoleService } from '../../../../service/role.service';
import { UserRegister } from '../../../../domain/user-register';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  formMaps!: FormGroup;
  autocomplete!: google.maps.places.Autocomplete;
  marker!: google.maps.Marker;

  user: UserRegister = {
    name: '',
    email:'',
    password: '',
    repeatedPassword:'',
    latitude: '',
    longitude:'',
    roleId: ''
  }

  roles: Role[] | undefined;

  selectedRole: Role | undefined;
  constructor(roleService: RoleService, private userService: UserService, private router: Router, private renderer: Renderer2){
    roleService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res
      }
    })
    this.markers = [];

    this.formMaps = new FormGroup({

      busqueda: new FormControl(''),
    })
  }

  changeShowValue(){
    if(this.selectedRole?.name == 'Botica'){
      this.showMap()
    }
  }

  register(){
    if(this.selectedRole)
     {
      this.user.roleId = this.selectedRole.id;
      this.userService.register(this.user).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {console.log(err)}
      })
     }
  }

  ngOnInit(): void {
  }

  showMap(): void {

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        await this.loadMap(position);
        this.loadAutocomplete();

      }, null, opciones);


    } else {
      console.log("navegador no compatible")
    }

  };



  private loadAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.renderer.selectRootElement(this.inputPlaces.nativeElement),
      {
        componentRestrictions: {
          country: ["PE"]
        },
        fields: ["address_components", "geometry", "place_id"]
      }
    );
  
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
  
      if (!place.geometry || !place.geometry.location) {
        console.log("Lugar no válido.");
        return;
      }
  
      this.mapa.panTo(place.geometry.location);
  
      if (this.marker) {
        this.marker.setMap(null);
      }
  
      this.marker = new google.maps.Marker({
        position: place.geometry.location,
        map: this.mapa,
        title: place.name,
        animation: google.maps.Animation.DROP
      });
          // Obtener latitud y longitud del marcador
        this.user.latitude = this.marker.getPosition()?.lat();
        this.user.longitude = this.marker.getPosition()?.lng();
    });
  }
  
  private loadMap(position: any): any {
    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones);
  
    // Agregar evento click al mapa
    google.maps.event.addListener(this.mapa, 'click', (evento: google.maps.MapMouseEvent) => {
      // Animación suave al centrar el mapa
      this.mapa.panTo(evento.latLng);
  
      // Eliminar el marcador existente si lo hay
      if (this.marker) {
        this.marker.setMap(null);
      }
  
      // Crear un nuevo marcador en la ubicación clickeada
      this.marker = new google.maps.Marker({
        position: evento.latLng,
        map: this.mapa,
        animation: google.maps.Animation.DROP
      });
  
      // Obtener latitud y longitud del marcador
      this.user.latitude = this.marker.getPosition()?.lat();
      this.user.longitude = this.marker.getPosition()?.lng();
    });
  
    // Inicialmente cargar el mapa con un marcador en la posición dada
    this.marker = new google.maps.Marker({
      position: opciones.center,
      map: this.mapa,
      title: "David",
      animation: google.maps.Animation.DROP
    });
  
    // Obtener latitud y longitud del marcador inicial
    this.user.latitude = this.marker.getPosition()?.lat();
    this.user.longitude = this.marker.getPosition()?.lng();
  }
}
