import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, QueryParam, QueryParams, Req
} from 'routing-controllers';

import { OpenAPI, ResponseSchema,  } from 'routing-controllers-openapi';
import { CurrencyCode } from '../interfaces/CurrencyCode/CurrencyCode';
import { SubscriptionCreateOptions, SubscriptionCreateSuccess } from '../interfaces/tap';
import { tapPaymentService } from '../services/tap.services';
import { ErrorResponse } from './responses/ErrorResponse';
import { SuccessResponse } from './responses/SuccessResponse';



@OpenAPI({
    tags: ['Subscription'],
    security: [
      { BearerAuth: [] }
    ], 

})
@Authorized()
@JsonController('/subscription')
export class SubscriptionControllers {

  // @Get()
  //   @OpenAPI({
  //       description: 'Get all Subscription history',
        
  //     })
  //     @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
  //     @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '401' })
  //   public findAll(): any {
      
  //     return [];
      
  //   }

   

    // @Get()
    // @OpenAPI({
    //     description: 'Get all available users with pagination',
        
    //   })
    //   @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    //   @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '401' })
    // public find(@QueryParam('page') page: string,@QueryParam('size') size: string): any {
      
    //   return {};
      
    // }

   

    // @Get('/:id')
    // @OpenAPI({
    //     description: 'Get payment by ID',
    //   })
    //   @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    //   @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    // public one(@Param('id') id: string): any| undefined {
    //     return {};
    // }

    @Post('/paypal')
    @OpenAPI({
        description: 'Create a new paypal Subscription',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public createPaypalSubscription(@Body({required:true,validate:true})  body: any): any {
       

        return [];
    }

    @Post('/tap')
    @OpenAPI({
        description: 'Create a new tap Subscription',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public async createTapSubscription(@Body({required:true,validate:true})  body: {customerId:string, cardId:string}): Promise<any> {
       const term={
        interval: "DAILY",
        period: 0,
        from: new Date().toISOString().slice(0,-5),
        due: 0,
        auto_renew: true,
        timezone:"GMT",
  
       }
       const trial={
        days:0,
        amount:0.1
       }
       const charge={
        "amount": 1,
        "currency": CurrencyCode.USD,
        "description": "Test Subscription",
        "statement_description": "Sample",
        "metadata": {
          "udf1": "test 1",
          "udf2": "test 2"
        },
        "receipt": {
          "email": true,
          "sms": true
        },
        "customer": {
          "id": body.customerId
        },
        "source": {
          "id": body.cardId
        },
        "post": {
          "url": "http://nodejs.faceki.com/webhooks/tap"
        }
       }
       const subscription={
        term,
        trial,
        charge
       }
      const resultverify:SubscriptionCreateSuccess= await tapPaymentService.tapCreateSubscription(subscription);
      console.log(resultverify)
      return resultverify;
    }

    @Get('/tap/:subId')
    @OpenAPI({
        description: 'Get Tap Subscription details',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public getTapSubscription(@Param("subId") subId:string)  : any {
       

        return [];
    }

    // @Put('/:id')
    // @OpenAPI({
    //     description: 'Update the user data',
    //   })
    //   @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    //   @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    // public update(@Param('id') id: string, @Body() body: any): any {
        

    //     return [];
    // }

    @Delete('/tap/:subId')
    @ResponseSchema(SuccessResponse, { description: 'disabled user' })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    @OpenAPI({
        description: 'Cancel subscription',
        responses: {
          '400': {
            description: 'Bad request',
          },
        },
      })
    public async cancelTapSubscription(@Param('subId') id: string): Promise<any> {
        const response= await tapPaymentService.cancelTapSubscription(id);
        console.log(response)
        return response;
    }

    @Delete('/paypal/:subId')
    @ResponseSchema(SuccessResponse, { description: 'disabled user' })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    @OpenAPI({
        description: 'Cancel Paypal subscription',
        responses: {
          '400': {
            description: 'Bad request',
          },
        },
      })
    public cancelPaypalSubscription(@Param('subId') id: string): any {
        return [];
    }

}
