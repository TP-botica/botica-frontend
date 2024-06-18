export interface Product {
    productId?: string;
    name?: string;
    imageUrl?: string;
    price?: number;
    category?: string;
    stock?: number;
}

export interface ProductServiceView{
    id:string;
    name:string;
    imageUrl:string;
    category: string;
}

export interface ProductInfo {
    name: string;
    description: string;
    prescriptionRequired: boolean;
    imageUrl: string;
    category: string;
}

export interface ProductShoppingCart{
    id: any;
    drugstoreId: string;
    drugstore:string;
    name:string;
    price:number;
    imageUrl:string;
    category: string;
    stock: number;
    quantity: number;
}

export interface Option{
 id: string;
 name: string;
}