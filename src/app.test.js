const { expect } = require('@jest/globals');
const supertest = require('supertest');

const server = require('./app');
const { HTTP_STATUS_CODE } = require('./constants');
const request = supertest(server);

describe('CRUD API', () => {
  const newPerson = {
    name: 'John',
    age: 25,
    hobbies: ['cycling', 'singing'],
  };

  const testAge = {
    age: 35,
  };

  let personId = '';

  describe('/GET person', () => {
    it('should GET an empty array', async () => {
      const res = await request.get('/api/person');

      expect(res.status).toBe(HTTP_STATUS_CODE.OK);
      expect(res.body.length).toBe(0);
    });
  });

  describe('/POST person', () => {
    it('should POST a new person', async () => {
      const res = await request.post('/api/person').send(newPerson);

      personId = res.body.id;

      expect(res.status).toBe(HTTP_STATUS_CODE.OK);
      expect(res.body.name).toBe(newPerson.name);
      expect(res.body.age).toBe(newPerson.age);
      expect(res.body.hobbies.length).toBe(newPerson.hobbies.length);
    });
  });

  describe('/GET/:id', () => {
    it('should GET a person by id', async () => {
      const res = await request.get(`/api/person/${personId}`);

      expect(res.status).toBe(HTTP_STATUS_CODE.OK);
      expect(res.body.name).toBe(newPerson.name);
      expect(res.body.age).toBe(newPerson.age);
      expect(res.body.hobbies.length).toBe(newPerson.hobbies.length);
    });
  });

  describe('/PUT/:id person', () => {
    it('should UPDATE a person by id', async () => {
      const res = await request.put(`/api/person/${personId}`).send(testAge);

      expect(res.status).toBe(HTTP_STATUS_CODE.OK);
      expect(res.body.name).toBe(newPerson.name);
      expect(res.body.age).toBe(testAge.age);
      expect(res.body.hobbies.length).toBe(newPerson.hobbies.length);
    });
  });

  describe('/DELETE/:id person', () => {
    it('should DELETE a person by id', async () => {
      const res = await request.delete(`/api/person/${personId}`);

      expect(res.status).toBe(HTTP_STATUS_CODE.NO_CONTENT);
    });
  });

  describe('/GET/:id', () => {
    it('should GET deleted person by id (by calling with 404 status code)', async () => {
      const res = await request.get(`/api/person/${personId}`);

      expect(res.status).toBe(HTTP_STATUS_CODE.NOT_FOUND);
    });
  });
});
