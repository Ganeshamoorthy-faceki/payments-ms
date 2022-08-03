import axios, { AxiosRequestConfig, Method } from 'axios'
import HttpException from '../exception/HttpException';
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
      this.baseURL = 'https://api.tap.company'
      this.secretApiKey = options.secretApiKey;
      const config = {
        headers: { Authorization: `Bearer ${options.secretApiKey}`,
        'Content-Type': 'application/json'} 
      };
      this.headerconfig = config;
  }


  private async request (apiName:string, url: string, method: Method, options?: AxiosRequestConfig, headers?: HeaderOptions) {
   
    
    const value = await axios(url, {
        ...{
            method
        },
        ...options,
        ...headers
    })
  

    return value
  // }catch(e){
    
  //   const { response } = e;
  //   const { request, ...errorObject } = response; // take everything but 'request'
  //   console.error(errorObject.status);  // ***
  //   console.error(errorObject.headers);
  //   return errorObject;
  // }
}
    public verifyCard = async ( data: Partial <CreateVerifyCardOptions>): Promise<CreateVerifyCardSuccess> => {
     
      
    
      const res = await this.request( 'Verify Card',
          `${this.baseURL}/v2/card/verify`, 'POST', {
            data
        },this.headerconfig);
        const responseData=res.data;
        // if(responseData.hasOwnProperty('errors')){
        //   const err=responseData.errors;
        //   console.log(err)

        //   throw new HttpException(400, 'unknown', 'message', err || []);
        // }else{
          return responseData;
        // }
      

      



    }

    public tapCreateSubscription = async ( data: Partial <SubscriptionCreateOptions>): Promise<SubscriptionCreateSuccess>  => {
       
        const res = await this.request('Create Subscription',
          `${this.baseURL}/v2/subscription/v1`, 'POST', {
            data
        }, this.headerconfig);
        
        return res.data;
    }
}

export const tapPaymentService = new TapService({
  sandboxMode:true,
  secretApiKey:"sk_test_VgZwpx82WuJ7UESzhcGNKqRl",//sk_live_ivhobN3YMV2B7Xp1xUeJTzn4
});

