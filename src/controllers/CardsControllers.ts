import { request } from 'http';
import {
    Authorized, Body, Delete, Get, HttpError, JsonController, OnUndefined, Param, Post, Put, QueryParam, QueryParams, Req
} from 'routing-controllers';

import { OpenAPI, ResponseSchema,  } from 'routing-controllers-openapi';
import { CurrencyCode } from '../interfaces/CurrencyCode/CurrencyCode';
import { CreateVerifyCardOptions, CreateVerifyCardSuccess, Customer } from '../interfaces/tap';
import { tapPaymentService } from '../services/tap.services';
import { VerifyCardRequest } from './requests/VerifyCardRequest';
import { ErrorResponse } from './responses/ErrorResponse';
import { SuccessResponse } from './responses/SuccessResponse';
import { VerifyCardReponse } from './responses/VerifyCardResponse';



@OpenAPI({
    tags: ['Cards'],
    security: [
      { BearerAuth: [] }
    ], 

})
@Authorized()
@JsonController('/api/v1/cards/tap')
export class CardsControllers {

  // @Get()
  //   @OpenAPI({
  //       description: 'Get all added Cards',
        
  //     })
  //     @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
  //     @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '401' })
  //   public findAll(): any {
      
  //     return [];
      
  //   }

   

  //   @Get()
  //   @OpenAPI({
  //       description: 'Get all available users with pagination',
        
  //     })
  //     @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
  //     @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '401' })
  //   public find(@QueryParam('page') page: string,@QueryParam('size') size: string): any {
      
  //     return {};
      
  //   }

   

  //   @Get('/:id')
  //   @OpenAPI({
  //       description: 'Get payment by ID',
  //     })
  //     @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
  //     @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
  //   public one(@Param('id') id: string): any | undefined {
  //       return {};
  //   }


    private generateVerifyCardObj(body:VerifyCardRequest, customer: Customer):CreateVerifyCardOptions{
      return {
        currency: CurrencyCode.USD,
        threeDSecure:true,
        save_card: true,
        redirect: {
          url: 'http://localhost:8080'
        },
        source: {
          id: body.tokenId
        },
        medadata:body.metadata?body.metadata:{"udf1": "test1",
        "udf2": "test2"},
        customer
      }
    }
    @Post('/verify')
    @OpenAPI({
        description: 'Verify a new card',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public verifycard(@Body()  body: VerifyCardRequest): VerifyCardReponse | void {
      const customer={
      first_name: 'string',
      middle_name: 'string',
      last_name: 'string',
      email: 'ganesha@faceki.com',
      phone: {
        'country_code':'91',
        'number': '9566721032'
      }
    }
    let url='';
      tapPaymentService.verifyCard(this.generateVerifyCardObj(body,customer)).then((resultverify:CreateVerifyCardSuccess) =>{

        url=resultverify.transaction.url;
        return {url};
      }).catch((err)=>{
        console.log("err"+(err));
        const errresp={
          httpCode:400,
          name: 'Unknown',
          message: 'message',
          errors: err || [],
        }
        // next(errresp)
        // throw  Error(errresp.message);
        // new Error("testing")
      });

     
      
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
    //     description: 'Disable the user',
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