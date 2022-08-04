import { CurrencyCode } from "../CurrencyCode/CurrencyCode";
import { Customer } from "./Customer";
import { MetaData, Redirect, Source } from "./Subscription";

export interface CreateVerifyCardOptions {
    currency: CurrencyCode;
    threeDSecure:boolean;
    save_card: boolean;
    redirect: Redirect;
    source: Source;
    medadata:MetaData;
    customer: Customer;
}

export interface Address{
    city:string;
    country:string;
    line1:string;
}
export interface DeleteCardResponse{
    delete:boolean;
    id:string;
}
export interface CardsList{
    object:string;
    has_more:boolean;
    data: TapCard[];
}
export interface TapCard{
    object: string;
    id: string
    last4: string;
    exp_month: number;
    exp_year: number;
    brand: string;
    name: string;
    address?:Address;
    address_line1?:string;
    address_country?:string;
    address_city?: string;
    phone_number:string;
    address_zip?: number;
    customer?: string;
    funding?:string;
    fingerprint?:string;
    first_six?:string;
     
}
export interface Transaction{
    timezone: string;
    url:string;
}

export interface Response{
    code: string;
    message: string;
}

export interface CreateVerifyCardSuccess {
    object: string;
    live_mode: boolean;
    api_version: string;
    id: string
    status: string
    currency: CurrencyCode;
    threeDSecure:boolean;
    save_card: boolean;
    response: Response;
    transaction: Transaction;
    redirect: Redirect;
    source: Source;
    medadata:MetaData;
    customer: Customer;
}
