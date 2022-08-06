import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, QueryParam, QueryParams, Req
} from 'routing-controllers';

import { OpenAPI, ResponseSchema,  } from 'routing-controllers-openapi';
import { ErrorResponse } from './responses/ErrorResponse';
import { SuccessResponse } from './responses/SuccessResponse';



@OpenAPI({
    tags: ['Webhooks'], 

})
@Authorized()
@JsonController('/webhooks')
export class WebhooksControllers {

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
        description: 'Webhook for paypal',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public webhookPaypal(@Body({required:true,validate:true})  body: any): any {
       

        return [];
    }

    @Post('/tap')
    @OpenAPI({
        description: 'Webhook for tap ',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public webhookTap(@Body({required:true,validate:true})  body: any): any {
       
        console.log(body);
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

    // @Delete('/:id')
    // @ResponseSchema(SuccessResponse, { description: 'disabled user' })
    // @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    // @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    // @OpenAPI({
    //     description: 'Cancel subscription',
    //     responses: {
    //       '400': {
    //         description: 'Bad request',
    //       },
    //     },
    //   })
    // public delete(@Param('id') id: string): any {
    //     return [];
    // }

}


// const storage = getMetadataArgsStorage()
// const spec = routingControllersToSpec(storage)
// console.log(JSON.stringify(spec))