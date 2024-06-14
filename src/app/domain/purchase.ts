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