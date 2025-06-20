import { param } from 'express-validator';
import BaseRequest from '../BaseRequest.js'

class GetByIdRequest extends BaseRequest {

    rules() {
        return [
            param('id').notEmpty().withMessage("Esperado um parâmetro identificador do produto.")
                .isMongoId()
        ];
    }

    authorize(req) {
        return true;
    }
}

export default new GetByIdRequest();