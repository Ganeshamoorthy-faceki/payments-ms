const jwt = require('jsonwebtoken')


import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { logger } from '../common/logger';
import { Client } from '../models/Client';

@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.header('Authorization').replace('Bearer ','')
            const decode = jwt.verify(token,'facekey3317791336599909')
            //const user = await User.findOne({_id:decode._id,'tokens.token':token})
            const client = await Client.findOne({client_id:decode._id/*,'tokens.token':token*/})
    
            if(!client){
                throw new Error()
            }
            req['token'] = token
            req['client_id'] = client.client_id
    
            next()
        }catch(e) {
            res.status(401).send({error:'Authentication failed...'})
        }
    }
};