import { HttpError } from "routing-controllers";

class HttpException extends Error {
    message: string;
    httpCode: number;
    name: string;
    errors: any[];
    errorstack:string;
    constructor(httpCode: number,name: string,message: string,errors?:any[],errorstack?:string) {
      console.log(`status:${httpCode}`)
      super(name);
      console.log(`status:${httpCode}`)

      this.message = message;
      this.httpCode=httpCode;
      this.errors=errors;
      this.name=name;
      this.errorstack =errorstack;
    }
  }
   
  export default HttpException;