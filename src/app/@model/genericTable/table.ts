export class Colum {
    field:string;
    header:string;
    visible?:boolean = true;
    action?: (event: any) => void = () => {};
}