import  { validationResult }from 'express-validator';
import ApiError from '../utils/ApiError.js';

class BaseRequest {
  constructor() {
  }

  rules() {
    throw new Error('O método "rules()" deve ser implementado pela classe filha.');
  }

  authorize() {
    return true;
  }

  validate() {
    return [
      ...this.rules(), 
      
      (req, res, next) => {
        if (!this.authorize(req)) {
          return next(new ApiError('Não autorizado.', 403));
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new ApiError('Erros de validação.', 400, errors)); 
        }
        next();
      }
    ];
  }
}

export default BaseRequest;