import { CurrencyCode } from "../../interfaces/CurrencyCode/CurrencyCode";
import { MetaData } from "../../interfaces/tap";
import { IsOptional, IsString, IsBoolean, ValidateNested, IsEnum, ValidatorConstraint, IsObject, Validate  } from 'class-validator';
import {Type} from 'class-transformer';
import { IsKeyValueValidate } from "../../validations/validation";
import { JSONSchema } from "class-validator-jsonschema";


 

export class VerifyCardRequest {

    @IsOptional()
    @IsEnum(CurrencyCode)
    currency?:CurrencyCode;

    @IsOptional()
    @IsBoolean()
    public threeDSecure?:boolean;

    @IsOptional()
    @IsBoolean()
    public save_card?:boolean;

    @IsOptional()
    @IsObject()
    @Validate(IsKeyValueValidate)
    @JSONSchema({  example:{
        "udf1": "test1",
        "udf2": "test2"
      }})
    public metadata?: MetaData;

    @IsString()
    public tokenId: string;

    @IsOptional()
    @IsString()
    public customerId: string;
}

