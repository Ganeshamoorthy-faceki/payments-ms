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
