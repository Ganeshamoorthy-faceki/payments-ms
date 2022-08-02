import { ErrorMessages } from '../../common/ErrorMessage';
import HttpException from '../../exception/HttpException';

export class UnauthorizedError extends HttpException {
  constructor() {
    console.log('test')
    super(404, ErrorMessages.UNAUTHORIZED);
  }
}