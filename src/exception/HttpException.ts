import { HttpError } from "routing-controllers";

class HttpException extends HttpError {
    status: number;
    message: string;
    constructor(status: number, message: string) {
      console.log(`status:${status}`)
      super(status,message);
      this.status = status;
      this.message = message;
    }
  }
   
  export default HttpException;