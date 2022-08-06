import { CurrencyCode } from "../../interfaces/CurrencyCode/CurrencyCode";
import { Charge, MetaData, SubscriptionCreateOptions, Term, Trial } from "../../interfaces/tap";
import { IsOptional, IsString, IsBoolean, ValidateNested, IsEnum, ValidatorConstraint, IsObject, Validate  } from 'class-validator';
import {Type} from 'class-transformer';
import { IsKeyValueValidate } from "../../validations/validation";
import { JSONSchema } from "class-validator-jsonschema";


 

export class AddSubscriptionRequest implements SubscriptionCreateOptions {

    @IsObject()
    @Validate(IsKeyValueValidate)
    @JSONSchema({  example:{
      "interval": "MONTHLY",
      "period": 10,
      "from": "2019-02-20T12:42:00",
      "due": 0,
      "auto_renew": true,
      "timezone": "Asia/Kuwait"
      }})
    term: Term;

    @IsOptional()
    @IsObject()
    @Validate(IsKeyValueValidate)
    @JSONSchema({  example:{
      "days": 2,
      "amount": 0.1
      }})
    trial: Trial;

    @IsObject()
    @Validate(IsKeyValueValidate)
    @JSONSchema({  example:{
      "amount": 1,
      "currency": "KWD",
      "description": "Test Description",
      "statement_descriptor": "Sample",
      "metadata": {
        "udf1": "test 1",
        "udf2": "test 2"
      },
      "reference": {
        "transaction": "txn_0001",
        "order": "ord_0001"
      },
      "receipt": {
        "email": false,
        "sms": true
      },
      "customer": {
        "id": "cus_Qe243220191752o5L21002551"
      },
      "source": {
        "id": "card_KhvrE5MgXCsSe72oyHGWkVI6"
      },
      "post": {
        "url": "http://your_website.com/post_url"
      }
    
      }})
    charge: Charge;

   
}

