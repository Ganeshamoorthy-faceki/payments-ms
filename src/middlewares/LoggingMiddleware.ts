import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { logger } from '../common/logger';

@Middleware({ type: 'before' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction): void {
      
            logger.info('\nRequest:');
            logger.info(`• Method:  ${req.method} `);
            logger.info(`• URL:  ${req.originalUrl} `);
            logger.info(`• Query: ${JSON.stringify(req.query, null, 2)}`);
            logger.info(`• Body: ${JSON.stringify(req.body, null, 2)}`);
            console.log('\nRequest:')
            console.log(`• Method:  ${req.method} `);
            console.log(`• URL:  ${req.originalUrl} `);
            console.log(`• Query: ${JSON.stringify(req.query, null, 2)}`);
            console.log(`• Body: ${JSON.stringify(req.body, null, 2)}`);
        next();
    }
};