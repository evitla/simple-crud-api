const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const HTTP_STATUS_CODE = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

const PERSON_FIELDS = ['name', 'age', 'hobbies'];

const urlWithIdRegex =
  /\/api\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;

module.exports = {
  HTTP_METHODS,
  HTTP_STATUS_CODE,
  PERSON_FIELDS,
  urlWithIdRegex,
};
