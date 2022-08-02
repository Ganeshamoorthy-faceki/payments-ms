import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class VerifyCardReponse {
    
    // @Expose()
    // @IsString()
    public url: string;
}