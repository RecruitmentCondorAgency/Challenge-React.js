export type Inputs = {
    email: string;
    password: string;
}
export type User = {
    id:number; 
    name:string;
    email:string;
    password:string;
    universities:[];
}

export type University ={
    name:string;
    country:string;
    alpha_two_code:string;
    web_pages:string[];
    domains:string[];
}