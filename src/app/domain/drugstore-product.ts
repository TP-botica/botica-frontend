export interface DrugstoreProduct {
    drugstoreId?: string | null;
    productId?: string;
    price?: number;
    stock?: number;
}

export interface DrugstoreProductEditable {
    price?: number;
    stock?: number;
}

export interface DrugstoreLocation {
    drugstoreId: string;
    name: string;
    latitude: string;
    longitude: string;
  }

export interface DrugstoreProductView{
    drugstore: string;
    product: string;
    price: number;
    stock: number;
}