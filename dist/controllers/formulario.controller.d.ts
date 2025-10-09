import { Request, Response } from 'express';
export declare class FormularioController {
    private readonly formularioRepository;
    constructor();
    getAllFormularios: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getFormularioById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    createFormulario: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updateFormulario: (req: Request, res: Response, next: import("express").NextFunction) => void;
    deleteFormulario: (req: Request, res: Response, next: import("express").NextFunction) => void;
    private validateFormularioBusinessRules;
    private validateUpdateBusinessRules;
    private validateQuestaoUpdate;
    private isMultipleChoiceQuestion;
    private validateMultipleChoiceAlternatives;
}
//# sourceMappingURL=formulario.controller.d.ts.map