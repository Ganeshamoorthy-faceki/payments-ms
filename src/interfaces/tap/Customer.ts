
export interface Customer{
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone: Phone;
    nationality?: string;
}

export interface CustomerGetOption{
    id: string;
}


export interface Phone{
    country_code:string;
    number: string;
}