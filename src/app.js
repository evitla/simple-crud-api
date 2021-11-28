if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const http = require('http');

const { HTTP_STATUS_CODE, HTTP_METHODS } = require('./constants');
const Person = require('./controller');
const { getReqData } = require('./utils');

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  const handleSuccess = (data) => {
    res.writeHead(HTTP_STATUS_CODE.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  const handleError = (error) => {
    res.writeHead(error.httpCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  };

  // /api/person : GET
  if (req.url === '/api/person' && req.method === HTTP_METHODS.GET) {
    try {
      const persons = await new Person().getPersons();

      handleSuccess(persons);
    } catch (error) {
      handleError(error);
    }
  }

  // /api/person/:id : GET
  else if (
    req.url.match(
      /\/api\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
    ) &&
    req.method === HTTP_METHODS.GET
  ) {
    try {
      const id = req.url.split('/')[3];
      const person = await new Person().getPerson(id);

      handleSuccess(person);
    } catch (error) {
      handleError(error);
    }
  }

  // /api/person/:id : DELETE
  else if (
    req.url.match(
      /\/api\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
    ) &&
    req.method === HTTP_METHODS.DELETE
  ) {
    try {
      const id = req.url.split('/')[3];
      const message = await new Person().deletePerson(id);

      handleSuccess(message);
    } catch (error) {
      handleError(error);
    }
  }

  // /api/person/:id : UPDATE
  else if (
    req.url.match(
      /\/api\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
    ) &&
    req.method === HTTP_METHODS.PUT
  ) {
    try {
      const id = req.url.split('/')[3];
      const personData = await getReqData(req);
      const updatedPerson = await new Person().updatePerson(id, JSON.parse(personData));

      handleSuccess(updatedPerson);
    } catch (error) {
      handleError(error);
    }
  }

  // /api/person : POST
  else if (req.url === '/api/person' && req.method === HTTP_METHODS.POST) {
    try {
      const personData = await getReqData(req);
      const person = await new Person().createPerson(JSON.parse(personData));

      handleSuccess(person);
    } catch (error) {
      handleError(error);
    }
  }

  // No route present
  else {
    handleError({ httpCode: HTTP_STATUS_CODE.BAD_REQUEST, message: 'Route not found' });
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
