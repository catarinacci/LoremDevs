import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema} from 'joi';

const joi_message_es: Record<string, string> = {
    "any.required": " es requerido",
    "number.empty": " es requerido",
    "number.min": " debe ser mayor o igual a {#limit}",
    "number.max": " debe ser menor o igual a {#limit}",
    
}


export function validateBodySales(req: Request, next: NextFunction,res:Response, schema: ObjectSchema): void  {
    const options: Joi.ValidationOptions = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
        messages: joi_message_es,
    };
    const { error} = schema.validate(req.body, options);

    if (error) {

        const keysArray: string[] = Object.keys(error.details);
     
        let errors:string[] = []

        for (let index =0 ;index < keysArray.length; index++) {
            
            let x = error.details[index];

            let typeError: string = "El campo "+x.path+x.message 
            
            errors.push(typeError.replace("[",""))
        }
        res.status(400)
            .json({
            success: false,
            message: errors
            });
        
        next(errors);
        return
    } else{
        // res.status(200)
        //     .json({
        //     success: true,
        //     message: "Validación exitosa"
        //     });
        next();
    }
}
