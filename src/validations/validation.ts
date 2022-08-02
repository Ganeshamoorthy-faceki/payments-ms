import { ValidatorConstraint, ValidatorConstraintInterface, 
  ValidationArguments } 
  from 
   "class-validator";
 
   @ValidatorConstraint({ name: 'IsKeyValueValidate', async: false })
   export class IsKeyValueValidate implements ValidatorConstraintInterface {
 
 
 
     async validate(colmunValue: Object, args: ValidationArguments) {
      console.log(":::::")
       try {
          if(this.isObject(colmunValue))
               return false; 
 
        var isValidate = true;
        Object.keys(colmunValue)
        .forEach(function eachKey(key) {  
           if(key.length > 20 || typeof key  != "string" || typeof colmunValue[key] != 
         "boolean")
           {
             isValidate = false;
           }
         });
        return isValidate ;
 
 
         } catch (error) {
      console.log(error);
       } 
 
        }
 
 isObject(objValue) {
 return objValue && typeof objValue === 'object' && objValue.constructor === Object;
    }
   
     defaultMessage(args: ValidationArguments) { 
      const params = args.constraints[0];
   if (!params.message)
      return `the ${args.property} is not validate`;
   else
      return params.message;
    }
    }

   