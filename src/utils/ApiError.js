export default class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status
        Error.captureStackTrace(this, this.constructor);
    }
}