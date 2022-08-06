import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, QueryParam, QueryParams, Req
} from 'routing-controllers';

import { OpenAPI, ResponseSchema,  } from 'routing-controllers-openapi';
import { ErrorResponse } from './responses/ErrorResponse';
import { SuccessResponse } from './responses/SuccessResponse';



@OpenAPI({
    tags: ['Payments'],
    security: [
      { BearerAuth: [] }
    ], 

})
@Authorized()
@JsonController('/payments')
export class PaymentControllers {

  @Get()
    @OpenAPI({
        description: 'Get all payments history',
        
      })
      @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
      @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '401' })
    public findAll(): any {
      
      return [];
      
    }

   

    @Get()
    @OpenAPI({
        description: 'Get all available users with pagination',
        
      })
      @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
      @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '401' })
    public find(@QueryParam('page') page: string,@QueryParam('size') size: string): any {
      
      return {};
      
    }

   

    @Get('/:id')
    @OpenAPI({
        description: 'Get payment by ID',
      })
      @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
      @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public one(@Param('id') id: string): any | undefined {
        return {};
    }

    @Post('/checkout')
    @OpenAPI({
        description: 'Create a new user',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public create(@Body({required:true,validate:true})  body: any): any {
       

        return [];
    }

    @Put('/:id')
    @OpenAPI({
        description: 'Update the user data',
      })
      @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
      @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public update(@Param('id') id: string, @Body() body: any): any {
        

        return [];
    }

    @Delete('/:id')
    @ResponseSchema(SuccessResponse, { description: 'disabled user' })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    @OpenAPI({
        description: 'Disable the user',
        responses: {
          '400': {
            description: 'Bad request',
          },
        },
      })
    public delete(@Param('id') id: string): any {
        return [];
    }

}


// const storage = getMetadataArgsStorage()
// const spec = routingControllersToSpec(storage)
// console.log(JSON.stringify(spec))