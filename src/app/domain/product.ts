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

export interface Option{
 id: string;
 name: string;
}