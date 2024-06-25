import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../../domain/role';
import { RoleService } from '../../../../service/role.service';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService],

})
export class RegisterComponent implements OnInit {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;
  @ViewChild('googleMap') googleMap!: any; 
  registerForm!: FormGroup;
  formMaps!: FormGroup;

  roles: Role[] | undefined;
  selectedRole: Role | undefined;

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 18;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPosition: google.maps.LatLngLiteral = this.center;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService  ) {
    this.roleService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res;
      }
    });

    this.formMaps = this.fb.group({
      busqueda: ['']
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
      role: [null, Validators.required],
      latitude: [''],
      longitude: ['']
    });
  }

  changeShowValue() {
    if (this.selectedRole?.name === 'Botica') {
      setTimeout(() => {
        this.initializeAutocomplete();
      }, 1);
      this.setCurrentLocation();
    }
  }

  register() {
    if (!this.selectedRole) {
      return;
    }

    const formValue = this.registerForm.value;
    formValue.roleId = this.selectedRole.id;

    if (formValue.password !== formValue.repeatedPassword) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden', life: 3000 });
      return;
    }

    this.userService.register(formValue).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso', life: 3000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar el usuario', life: 3000 });
      }
    });
  }

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.markerPosition = this.center;
          this.registerForm.patchValue({
            latitude: this.center.lat,
            longitude: this.center.lng
          });
        },
        (error) => {
          console.error('Error getting location', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la ubicación', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La geolocalización no está soportada por este navegador', life: 3000 });
    }
  }

  initializeAutocomplete() {
    if (!this.inputPlaces || !this.inputPlaces.nativeElement) {
      console.error('Elemento inputPlaces no está disponible.');
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement, {
      componentRestrictions: {
        country: ["PE"] // Ajusta el país según tus necesidades
      },
      fields: ["geometry", "place_id"]
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();  
      if (!place.geometry || !place.geometry.location) {
        console.error("El lugar seleccionado no tiene una ubicación válida.");
        return;
      }
  
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.markerPosition = this.center;
      this.registerForm.patchValue({
        latitude: this.center.lat,
        longitude: this.center.lng
      });
      });
  }


  
  moveMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = event.latLng.toJSON();
      this.registerForm.patchValue({
        latitude: this.markerPosition.lat,
        longitude: this.markerPosition.lng
      });
    }
  }

  updateMarkerPosition(event: any) {
    if (event.latLng) {
      this.markerPosition = event.latLng.toJSON();
      this.registerForm.patchValue({
        latitude: this.markerPosition.lat,
        longitude: this.markerPosition.lng
      });
    }
  }
}