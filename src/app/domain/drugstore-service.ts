export interface DrugstoreService {
    drugstoreId?: string | null;
    serviceId?: string;
    price?: number;
}

export interface DrugstoreServiceEditable {
    price?: number;

}

export interface DrugstoreServiceView{
    drugstore: string;
    service: string;
    price: number;
}