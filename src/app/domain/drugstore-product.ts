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