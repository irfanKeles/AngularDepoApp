import { Product } from "./product";

export class Warehouse{
    id:number;
    rayon:string;
    products?:Product[];
    type:string;
}

export class WarehouseRequest {
    id:number;
    rayon:string;
    products?:Product[];
    type:string;
}