import axios, { AxiosRequestConfig, Method } from 'axios'
import { CreateVerifyCardOptions, CreateVerifyCardSuccess } from '../interfaces/tap/Card';
import { SubscriptionCreateOptions, SubscriptionCreateSuccess } from '../interfaces/tap/Subscription';
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
      this.baseURL = this.sandboxMode ? 'https://api.sandbox.tap.company.com' : 'https://api.tap.company.com'
      this.secretApiKey = options.secretApiKey;
      const config = {
        headers: { Authorization: `Bearer ${options.secretApiKey}`,
        'Content-Type': 'application/json'} 
      };
      this.headerconfig = config;
  }


  private async request (url: string, method: Method, options?: AxiosRequestConfig) {
   
    
    const value = await axios(url, {
        ...{
            method
        },
        ...options,
        ...this.headerconfig
    })
    return value
}
    public verifyCard = async ( data: Partial <CreateVerifyCardOptions>): Promise<CreateVerifyCardSuccess> => {
     

      const res = await this.request(
          `${this.baseURL}/v2/card/verify`, 'POST', {
            data
        });
        return res.data


    }

    public tapCreateSubscription = async ( data: Partial <SubscriptionCreateOptions>): Promise<SubscriptionCreateSuccess>  => {
       
        const res = await this.request(
          `${this.baseURL}/v2/subscription/v1`, 'POST', {
            data
        });
        return res.data;
    }
}

export const tapPaymentService = new TapService({
  sandboxMode:true,
  secretApiKey:"sk_test_VgZwpx82WuJ7UESzhcGNKqRl",//sk_live_ivhobN3YMV2B7Xp1xUeJTzn4
});

