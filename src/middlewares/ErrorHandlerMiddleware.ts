import { NextFunction, Request, Response } from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

import { logger } from '../common/logger';
const dotenv = require('dotenv').config();

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    public isProduction = !dotenv.parsed.IS_OFFLINE;

    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public error(error: HttpError, req: Request, res: Response, next: NextFunction): void {
        res.status(error.httpCode || 500);
        res.json({
            name: error.name,
            message: error.message,
            errors: error[`errors`] || [],
        });

        if (this.isProduction) {
            logger.error(error.name, error.message);
        } else {
            logger.error(error.name, error.stack);
        }

    }

}