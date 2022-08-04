import { integer } from 'aws-sdk/clients/cloudfront'
import { boolean, string } from 'yup';
import { CurrencyCode } from '../CurrencyCode/CurrencyCode'
import { CustomerGetOption } from './Customer'




export interface Term{
    interval: "DAILY" | "WEEKLY" | "MONTHLY" | "BIMONTHLY" | "QUARTERLY" | "HALFYEARLY" | "YEARLY",
    period: number;
    from: string;
    due: number;
    auto_renew: number;
    timezone:string;
    count?:number;
    days_until_due?:number;
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

export interface Receipt{
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
    receipt: Receipt;
    metadata: MetaData;
    subscription_id?: string;
    redirect?: Redirect;
    

}

export interface ChargeObj{
    date:string;
    charge_id:string;
    status:string;
    Created:string;
}

export interface Redirect{
    url: string;
}


export interface SubscriptionCreateOptions {

    term: Term;
    trial:Trial;
    charge: Charge;
}

export interface GetSubscriptionDetails {
    live_mode:boolean;
    Object:"Subscription";
    api_version:string;
    feature_version:string;
    subscription: Subscription;
}

export interface CancelSubscriptionDetails {
    id:string;
    live_mode:boolean;
    object:"Subscription";
    api_version:string;
    feature_version:string;
    status: string;
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
    amount?:string;
    currency?:CurrencyCode;
    term: Term;
    trial?:Trial;
    charges?: ChargeObj[];
    charge?: Charge;

}

export interface UpdateSubscription{
    subscription_id:string;
    amount:number;
    "auto-renew":boolean;
    description:string;
    statement_descriptor:string;
    metadata:MetaData;
    reference: Reference;
    receipt:Receipt;
    post: POST;

}
