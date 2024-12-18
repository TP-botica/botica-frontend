export interface Purchase{
    id:string;
    customer:string;
    date:Date;
    total:number;
}

export interface PurchaseDetail{
    name: string;
    quantity: number;
    price: number;
    discount: number;

}

export interface PurchaseRegister{
    customerId: any;
    drugstoreId: any;
    purchaseDetails: Detail[]
}

export interface Detail{
    productId: string;
    quantity: number;
    price: number;
    discount: number;
}