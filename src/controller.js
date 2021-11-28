const uuid = require('uuid');
const { PERSON_FIELDS, HTTP_STATUS_CODE } = require('./constants');

const { NotFoundError, APIError } = require('./custom-errors');
const { getData, writeData } = require('./utils');

class Controller {
  async getPersons() {
    const data = await getData('./data.json');
    if (!Array.isArray(data.persons)) {
      throw new APIError('INTERNAL SERVER ERROR');
    }

    return data.persons;
  }

  async getPerson(id) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === id);

      if (!person) {
        const error = new NotFoundError(`No person with id '${id}' found`);
        reject(error);
      } else {
        resolve(person);
      }
    });
  }

  async createPerson(person) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      if (!PERSON_FIELDS.every((field) => person.hasOwnProperty(field))) {
        const error = new APIError(
          'BAD REQUEST',
          HTTP_STATUS_CODE.BAD_REQUEST,
          'Body does not contain required fields',
        );

        reject(error);
      } else {
        const newPerson = {
          id: uuid.v1(),
          ...person,
        };

        data.push(newPerson);
        const updatedData = { persons: data };

        writeData('./data.json', updatedData);

        resolve(newPerson);
      }
    });
  }

  async updatePerson(id, updatedPersonData) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === id);
      const personIndex = data.findIndex((person) => person.id === id);

      if (personIndex === -1) {
        const error = new NotFoundError(`No person with id '${id}' found`);
        reject(error);
      } else {
        for (const field in updatedPersonData) {
          person[field] = updatedPersonData[field];
        }

        data[personIndex] = person;
        const updatedData = { persons: data };

        writeData('./data.json', updatedData);

        resolve(person);
      }
    });
  }

  async deletePerson(id) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === id);

      if (!person) {
        const error = new NotFoundError(`No person with id '${id}' found`);
        reject(error);
      } else {
        const updatedPersons = data.filter((p) => person.id !== p.id);
        const updatedData = { persons: updatedPersons };

        writeData('./data.json', updatedData);

        resolve('Person deleted successfully');
      }
    });
  }
}

module.exports = Controller;
