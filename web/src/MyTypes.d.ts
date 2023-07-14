export type Inputs = {
    name?: string;
    universities?:[];
    email: string;
    password: string;
}


export type Search = {
    search:string;
}

export type University ={
    name:string;
    country:string;
    alpha_two_code:string;
    web_pages:string[];
    domains:string[];
}

export type User = {
    id:number; 
    name:string;
    email:string;
    password:string;
    universities:[];
}

export type Country = {
    currencies?:{
        [key: string]:{
            name:string;
            symbol:string;
        };
    };
    region?:string;
    capital?:[];
    population?:number;
    languages?:{
        [key: string]:string
    };
    flag?:string;

}