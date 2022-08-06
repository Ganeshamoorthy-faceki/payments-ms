import { Action, useExpressServer } from 'routing-controllers';
import { logger } from '../common/logger';
import express from 'express';

import { PaymentControllers } from '../controllers/PaymentControllers';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';
import { attachSwagger } from './swagger/swagger';
import { SecurityMiddleware } from '../middlewares/SecurityMiddleware';
import { SubscriptionControllers } from '../controllers/SubscriptionControllers';
import { CardsControllers } from '../controllers/CardsControllers';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { ErrorHandlerMiddleware } from '../middlewares/ErrorHandlerMiddleware';
import { WebhooksControllers } from '../controllers/WebhooksController';
// import CognitoExpress from 'cognito-express';



// paypal.createProduct({
//     name: "KYC",
//     description: "Biometric Authentication & Sign-in",
//     type: "SERVICE",
//     category: "SOFTWARE",
//     image_url: "https://faceki.com/wp-content/uploads/2021/02/cropped-2-FACEKI-Logo-Transparent-1-1.png",
//     home_url: "https://faceki.com/biometric-authentication-prices/"
// });

// paypal.listProducts().then(console.log);

// paypal.createPlan({
//     product_id: "PROD-39V636255E437301X",
//     name: 'PRO',
//     description: 'PRO plan KYC',
//     billing_cycles: [
//         {frequency: {
//             interval_unit: 'DAY',
//             interval_count: 1,
//         },
//         tenure_type: 'REGULAR',
//         sequence: 1,
//         pricing_scheme: {
//             fixed_price: {
//                 currency_code: 'USD',
//                 value:'1',
//             }
//         }
//     }],
//     payment_preferences: {
//         auto_bill_outstanding: true,
//         setup_fee: {
//             currency_code: 'USD',
//             value:'1',
//         },
//         setup_fee_failure_action: 'CONTINUE',
//         payment_failure_threshold: 3
//     },
//     taxes: {
//         percentage: '1',
//         inclusive: false
//     }
// }).then(console.log);

const port = 3000//config.get('express.port');

export class Application{
  server:any;
  app: express.Express;
  
  constructor()  {
    this.app = express();
    
    useExpressServer(this.app,{
      cors:{
        origin:"*"
      },
      routePrefix:'/api/v1',
      development: false,
      defaultErrorHandler: false,
       controllers: [PaymentControllers,SubscriptionControllers, CardsControllers,WebhooksControllers],
       authorizationChecker: async (action: Action, roles?: string[]) => {
      //   const token = action.request.headers["authorization"];
      //   if (action.request.method=="POST" || action.request.method=="GET"){
      //     return true;
      //   }
      //   console.log(token);
      //   try {
      //     const response= await cognitoExpress.validate(token);
      //     if(response){

      //       return true
      //     }
      //   } catch (error) {
      //     return false;
      //   }
        
      //   // return token!=null;
      return true;
      },
      middlewares:[LoggingMiddleware,  SecurityMiddleware, ErrorHandlerMiddleware]
    }); 
    attachSwagger(this.app);

    this.app.listen(port,
      () => {
          logger.info(`
          
            ------------
            Server Started!
            Serving on http://localhost:${port}
            ------------
          `);
  })
  };
}
