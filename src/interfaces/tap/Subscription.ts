import { integer } from 'aws-sdk/clients/cloudfront'
import { CurrencyCode } from '../CurrencyCode/CurrencyCode'
import { CustomerGetOption } from './Customer'




export interface Term{
    interval: "DAILY" | "WEEKLY" | "MONTHLY" | "BIMONTHLY" | "QUARTERLY" | "HALFYEARLY" | "YEARLY",
    period: number;
    from: string;
    due: number;
    auto_renew: number;
    timezone:string;
}

export interface Trial{
    days: number;
    amount: number;
}

export interface MetaData{
    [key:string]: string;
}

export interface Reference{
    transaction: string;
    order: string;
}

export interface Reciept{
    email: boolean;
    sms: boolean;
}

export interface Source{
    object?:string;
    payment_method?: string;
    id: string;
}

export interface POST{
    url: string;
}

export interface Charge{
    amount: number;
    currency: CurrencyCode;
    description: string;
    statement_description: string;
    threeDSecure?:boolean;
    save_card?:boolean;
    customer: CustomerGetOption;
    source: Source;
    post : POST;
    reference: Reference;
    reciept: Reciept;
    metadata: MetaData;
    subscription_id?: string;
    redirect?: Redirect;

}

export interface Redirect{
    url: string;
}


export interface SubscriptionCreateOptions {

    term: Term;
    trial:Trial;
    charge: Charge;
}

export interface SubscriptionCreateSuccess {
    id: string
    status: string
    merchant_id: string
    term: Term;
    trial:Trial;
    charge: Charge;
}

export interface Subscription {
    id: string
    status: string
    merchant_id: string
    term: Term;
    trial:Trial;
    charge: Charge;
}
