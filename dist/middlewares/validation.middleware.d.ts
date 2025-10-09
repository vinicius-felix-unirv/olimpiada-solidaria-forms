import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
export declare const formularioValidationSchemas: {
    create: Joi.ObjectSchema<any>;
    update: Joi.ObjectSchema<any>;
};
export declare const validateFormulario: (schema: "create" | "update") => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.middleware.d.ts.map