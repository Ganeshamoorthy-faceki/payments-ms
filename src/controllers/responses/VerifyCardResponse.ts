import { Expose } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';

export class VerifyCardReponse {
    
    // @Expose()
    @IsUrl()
    public url: string;

    @IsString()
    public verifyCardId:string;
}