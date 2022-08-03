import { NextFunction, Request, Response } from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { AxiosError } from "axios";

import { logger } from '../common/logger';
import HttpException from '../exception/HttpException';
const dotenv = require('dotenv').config();
function isAxiosError<T>(error: Error | AxiosError<T>): error is AxiosError<T> {
    return "isAxiosError" in error && error.isAxiosError;
  }
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    
    public isProduction = !dotenv.parsed.IS_OFFLINE;

    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public error(error: HttpException, req: Request, res: Response, next: NextFunction): void {
        console.log('inside::::'+error.errors)

        if (isAxiosError(error)) {
            
            const {response} =error;
            const { request, ...errorObject } = response;
            res.status(errorObject.status).json({
                name: errorObject.statusText,
                message: 'Error while processing request '+req.url,
                errors: errorObject.data[`errors`] || [],
            });
        } else {
           
        res.status(error.httpCode || 500);
        res.json({
            name: error.name,
            message: error.message,
            errors: error[`errors`] || [],
        });
        
        console.log('inside::::')

        
        if (this.isProduction) {
            logger.error(error.name, error.message);
        } else {
            logger.error(error.name, error.errorstack);
        }
        
        console.log(error);
        next(res)
    }
}

}