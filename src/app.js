if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const http = require('http');
const Person = require('./controller');
const { getReqData } = require('./utils');

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // /api/person : GET
  if (req.url === '/api/person' && req.method === 'GET') {
    const people = await new Person().getPersons();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(people));
  }

  // /api/person/:id : GET
  else if (
    req.url.match(
      /\/api\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
    ) &&
    req.method === 'GET'
  ) {
    try {
      const id = req.url.split('/')[3];
      const person = await new Person().getPerson(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/person/:id : DELETE
  else if (
    req.url.match(
      /\/api\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
    ) &&
    req.method === 'DELETE'
  ) {
    try {
      const id = req.url.split('/')[3];
      const message = await new Person().deletePerson(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(message));
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/person/:id : UPDATE
  else if (
    req.url.match(
      /\/api\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
    ) &&
    req.method === 'PUT'
  ) {
    try {
      const id = req.url.split('/')[3];
      const updatedPerson = await new Person().updatePerson(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedPerson));
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/person : POST
  else if (req.url === '/api/person' && req.method === 'POST') {
    const personData = await getReqData(req);

    let person = await new Person().createPerson(JSON.parse(personData));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(person));
  }

  // No route present
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
