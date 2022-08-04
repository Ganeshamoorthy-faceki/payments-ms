import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsJSON, IsString, IsUrl, ValidateNested } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { CurrencyCode } from '../../interfaces/CurrencyCode/CurrencyCode';
import { CreateVerifyCardSuccess, Customer, MetaData, Redirect, Response, Source, Transaction } from '../../interfaces/tap';

export class VerifyCardSuccessResponse implements CreateVerifyCardSuccess {

    @JSONSchema({  example: "verify_card"})
    @IsString()
    public object: string;

    @IsBoolean()
    public live_mode: boolean;

    @JSONSchema({  example: "V1.2"})
    @IsString()
    public api_version: string;

    @JSONSchema({  example: "vry_xxxxxx"})
    @IsString()
    public id: string;

    @IsString()
    public status: string;

    @IsEnum(CurrencyCode)
    public currency: CurrencyCode;

    @IsBoolean()
    public threeDSecure: boolean;

    @IsBoolean()
    public save_card: boolean;

    @ValidateNested()
    public response: Response;
    @ValidateNested()
    public transaction: Transaction;
    @ValidateNested()
    public redirect: Redirect;
    @ValidateNested()
    public source: Source;
    @ValidateNested()
    public medadata: MetaData;
    @ValidateNested()
    public customer: Customer;
    
    // @Expose()
    
}