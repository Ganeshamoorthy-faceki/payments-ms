import { request } from 'http';
import {
    Authorized, Body, Delete, Get, HttpError, JsonController, OnUndefined, Param, Post, Put, QueryParam, QueryParams, Req
} from 'routing-controllers';

import { OpenAPI, ResponseSchema,  } from 'routing-controllers-openapi';
import HttpException from '../exception/HttpException';
import { CurrencyCode } from '../interfaces/CurrencyCode/CurrencyCode';
import { CardsList, CreateVerifyCardOptions, CreateVerifyCardSuccess, Customer, DeleteCardResponse, TapCard } from '../interfaces/tap';
import { tapPaymentService } from '../services/tap.services';
import { VerifyCardRequest } from './requests/VerifyCardRequest';
import { ErrorResponse } from './responses/ErrorResponse';
import { SuccessResponse } from './responses/SuccessResponse';
import { VerifyCardReponse } from './responses/VerifyCardResponse';
import { VerifyCardSuccessResponse } from './responses/VerifyCardSuccessResponse';



@OpenAPI({
    tags: ['Cards'],
    security: [
      { BearerAuth: [] }
    ], 

})
@Authorized()
@JsonController('/cards')
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
          url: 'http://nodejs.faceki.com/api/v1/webohook/tap'
        },
        source: {
          id: body.tokenId
        },
        medadata:body.metadata?body.metadata:{"udf1": "test1",
        "udf2": "test2"},
        customer
      }
    }
    @Post('/tap/verify')
    @OpenAPI({
        description: 'Verify a new card',
      })
      @ResponseSchema(VerifyCardReponse, {statusCode:'200'})
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public async verifycard(@Body()  body: VerifyCardRequest): Promise<VerifyCardReponse > {
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
    console.log("testing controller")
    let url='';
    const resultverify:CreateVerifyCardSuccess= await tapPaymentService.verifyCard(this.generateVerifyCardObj(body,customer))
    if(resultverify.transaction.url){
      return {url:resultverify.transaction.url,
        verifyCardId:resultverify.id 
      }
    }

    

     
      
    }


    @Get('/tap/verify/:verifyCardId')
    @OpenAPI({
        description: 'Get the Verify Card details',
      })
    @ResponseSchema(VerifyCardSuccessResponse, {statusCode:'200'})
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public async getVerifyCard(@Param('verifyCardId') id :string): Promise<CreateVerifyCardSuccess> {
      
    const resultverify:CreateVerifyCardSuccess= await tapPaymentService.retrieveVerifyCard(id);
    return resultverify;

    }

    @Get('/tap/:userId')
    @OpenAPI({
        description: 'Verify a new card',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public async getUserCards(@Param('userId') id :string): Promise<CardsList> {
      
    const resultverify:CardsList= await tapPaymentService.getAllCards(id);
    return resultverify;

    }

    @Get('/tap/:userId/:cardId')
    @OpenAPI({
        description: 'Get a specific card',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public async getUserCard(@Param('userId') userId :string,@Param('cardId') cardId: string): Promise<TapCard> {
      
    const resultverify:TapCard= await tapPaymentService.getCard(userId,cardId);
    return resultverify;

    }


    @Delete('/tap/:userId/:cardId')
    @OpenAPI({
        description: 'Delete a specific card',
      })
    @ResponseSchema(ErrorResponse, { description: 'Unauthorized', statusCode: '401' })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '403' })
    public async deleteUserCard(@Param('userId') userId :string,@Param('cardId') cardId: string): Promise<DeleteCardResponse> {
      
    const resultverify:DeleteCardResponse= await tapPaymentService.deleteCard(userId,cardId);
    return resultverify;

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