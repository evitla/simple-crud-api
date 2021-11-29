const { HTTP_STATUS_CODE } = require('./constants');

class CustomError extends Error {
  constructor(name, httpCode, message) {
    super(message);

    this.name = name;
    this.httpCode = httpCode;
    this.isCustom = true;
  }
}

class APIError extends CustomError {
  constructor(
    name,
    httpCode = HTTP_STATUS_CODE.INTERNAL_SERVER,
    message = 'internal server error',
  ) {
    super(name, httpCode, message);
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'not found error') {
    super('NOT FOUND', HTTP_STATUS_CODE.NOT_FOUND, message);
  }
}

module.exports = { APIError, NotFoundError };
