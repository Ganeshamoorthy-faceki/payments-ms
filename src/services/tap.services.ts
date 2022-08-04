import axios, { AxiosRequestConfig, Method } from 'axios'
import HttpException from '../exception/HttpException';
import { CreateVerifyCardOptions, CreateVerifyCardSuccess, TapCard, CardsList, DeleteCardResponse } from '../interfaces/tap/Card';
import { CancelSubscriptionDetails, GetSubscriptionDetails, SubscriptionCreateOptions, SubscriptionCreateSuccess, UpdateSubscription } from '../interfaces/tap/Subscription';
const config = {
    headers: { Authorization: `Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ`,
    'Content-Type': 'application/json'} 

  };
  type HeadersInit =  { [key: string]: string };
  interface TapOptions {
    sandboxMode: boolean;
    secretApiKey: string;
};

interface HeaderOptions{
  headers: HeadersInit
}
class TapService {
  public sandboxMode: boolean;
  public secretApiKey: string;
  public baseURL: string;
  public headerconfig:HeaderOptions;
  constructor (options: TapOptions) {
      this.sandboxMode = options.sandboxMode
      this.baseURL = 'https://api.tap.company'
      this.secretApiKey = options.secretApiKey;
      const config = {
        headers: { Authorization: `Bearer ${options.secretApiKey}`,
        'Content-Type': 'application/json'} 
      };
      this.headerconfig = config;
  }


  private async request (apiName:string, url: string, method: Method,  headers?: HeaderOptions, options?: AxiosRequestConfig) {
   
    
    const value = await axios(url, {
        ...{
            method
        },
        ...options,
        ...headers
    })
  

    return value

}
    public verifyCard = async ( data: Partial <CreateVerifyCardOptions>): Promise<CreateVerifyCardSuccess> => {
     
      
    
      const res = await this.request( 'Verify Card',
          `${this.baseURL}/v2/card/verify`, 'POST',this.headerconfig, {
            data
        });
          return res.data;

    }

    public retrieveVerifyCard = async ( verify_id: string): Promise<CreateVerifyCardSuccess> => {
     
      
    
      const res = await this.request( 'Verify Card',
          `${this.baseURL}/v2/card/verify/${verify_id}`, 'GET',this.headerconfig);
          return res.data;

    }


    public getAllCards = async ( customerId:string): Promise<CardsList> => {
     
      
    
      const res = await this.request( 'Get all cards',
          `${this.baseURL}/v2/card/${customerId}`, 'GET',this.headerconfig);
          return res.data;

    }

    public getCard = async ( customerId:string, cardId:string): Promise<TapCard> => {
     
      
    
      const res = await this.request( 'Get Card',
          `${this.baseURL}/v2/card/${customerId}/${cardId}`, 'GET',this.headerconfig);
          return res.data;

    }

    public deleteCard = async ( customerId:string, cardId:string): Promise<DeleteCardResponse> => {
     
      
    
      const res = await this.request( 'Delete Card',
          `${this.baseURL}/v2/card/${customerId}/${cardId}`, 'DELETE',this.headerconfig);
          return res.data;

    }
    
    

    public tapCreateSubscription = async ( data: Partial <SubscriptionCreateOptions>): Promise<SubscriptionCreateSuccess>  => {
       
        const res = await this.request('Create Subscription',
          `${this.baseURL}/v2/subscription/v1`, 'POST', this.headerconfig, {
            data
        });
        
        return res.data;
    }

    public getTapSubscription = async ( subId:string ): Promise<GetSubscriptionDetails>  => {
       
      const res = await this.request('Get Subscription',
        `${this.baseURL}/v2/subscription/v1/${subId}`, 'GET', this.headerconfig);
      
      return res.data;
  }

  public getAllTapSubscription = async ( subId:string ): Promise<GetSubscriptionDetails>  => {
       
    const res = await this.request('Get All Subscriptions',
      `${this.baseURL}/v2/subscription/v1/list`, 'POST', this.headerconfig);
    
    return res.data;
}

public cancelTapSubscription = async ( subId:string ): Promise<CancelSubscriptionDetails>  => {
       
  const res = await this.request('Cancel Subscription',
    `${this.baseURL}/v2/subscription/v1/${subId}`, 'DELETE', this.headerconfig);
  
  return res.data;
}

  public updateTapSubscription = async ( data:UpdateSubscription ): Promise<GetSubscriptionDetails>  => {
       
    const res = await this.request('Create Subscription',
      `${this.baseURL}/v2/subscription/v1/`, 'GET', this.headerconfig,{data});
    
    return res.data;
}

    
}

export const tapPaymentService = new TapService({
  sandboxMode:true,
  secretApiKey:"sk_test_VgZwpx82WuJ7UESzhcGNKqRl",//sk_live_ivhobN3YMV2B7Xp1xUeJTzn4
});

