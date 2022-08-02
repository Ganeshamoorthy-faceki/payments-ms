import { ErrorMessages } from '../../common/ErrorMessage';
import HttpException from '../../exception/HttpException';

export class UserNotFoundError extends HttpException {
  constructor() {
    console.log("USER::::::::::::::::::::::::")
    super(404, ErrorMessages.USERNOTFOUND);
  }
}


 