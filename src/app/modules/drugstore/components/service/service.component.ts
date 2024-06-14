import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Option } from '../../../../domain/product';
import { Table } from 'primeng/table';
import { DrugstoreProduct } from '../../../../domain/drugstore-product';
import { Service } from '../../../../domain/service';
import { ServiceService } from '../../../../service/service.service';
import { DrugstoreServiceService } from '../../../../service/drugstore-service.service';
import { DrugstoreService, DrugstoreServiceEditable } from '../../../../domain/drugstore-service';

@Component({
  selector: 'app-service',
  providers: [MessageService, ConfirmationService],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit{
    @ViewChild('dt') dt: Table | undefined;
  
    productDialog: boolean = false;
  
    services!: Service[];
  
    service!: Service;
  
    serviceOptions: Option[] | undefined;
  
    selectedService: Option | undefined;
  
    submitted: boolean = false;
  
    create: boolean = false;
  
    statuses!: any[];
  
    constructor(private serviceService: ServiceService, private messageService: MessageService,
       private confirmationService: ConfirmationService, private drugstoreServiceService: DrugstoreServiceService) {
          serviceService.getServiceOptions().subscribe({
              next: (res: any) => {
                this.serviceOptions = res
              }
            })
       }
  
    ngOnInit() {
      this.getServices();
    }
  
    getServices(){
      this.serviceService.getMyServices(localStorage.getItem('profileId')).subscribe({
          next: (res)=> {this.services = res},
          error: (err) => {console.log(err)}
        })
    }
  
    applyFilterGlobal($event: any, stringVal: any) {
      this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }
  
    openNew() {
        this.selectedService = undefined;
        this.service = {};
        this.submitted = false;
        this.productDialog = true;
        this.create = true;
    }
  
    editService(service: Service) {
        this.create = false;
        this.service = { ...service };
        this.productDialog = true;
    }
  
    deleteService(service: Service) {
        this.confirmationService.confirm({
            message: 'Seguro que quieres eliminar ' + service.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.drugstoreServiceService.deleteDrugstoreService(localStorage.getItem('profileId'),service.serviceId).subscribe({
                  next: ()=> {
                      this.getServices()
                      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio Eliminado', life: 3000 });}
                })
            }
        });
    }
  
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
  
    saveService() {
        this.submitted = true;
  
        if (this.service.name?.trim() || this.selectedService?.name.trim()) {
            if (this.service.serviceId) {
                let drugstoreService: DrugstoreServiceEditable = {
                  price: this.service.price,
                }
                this.services[this.findIndexById(this.service.serviceId)] = this.service;
  
                this.drugstoreServiceService.updateDrugstoreService(localStorage.getItem('profileId'),this.service.serviceId, drugstoreService).subscribe({
                  next: () => { 
                      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio Actualizado', life: 3000 });}
                })
  
            } else {
              let drugstoreService: DrugstoreService= {
                  drugstoreId: localStorage.getItem('profileId'),
                  serviceId: this.selectedService?.id,
                  price: this.service.price
                }
              this.drugstoreServiceService.addDrugstoreService(drugstoreService).subscribe({
                  next: () => { 
                      this.getServices();
                      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio Creado', life: 3000 });},
                  error: () => {this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servicio ya registrado', life: 3000 })}
                })
            }
  
            this.services = [...this.services];
            this.productDialog = false;
            this.service = {};
        }
    }
  
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.services.length; i++) {
            if (this.services[i].serviceId === id) {
                index = i;
                break;
            }
        }
  
        return index;
    }
  
  }