const uuid = require('uuid');

const { NotFoundError } = require('./custom-errors');
const { getData, writeData } = require('./utils');

class Controller {
  async getPersons() {
    return (await getData('./data.json')).persons;
  }

  async getPerson(id) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === id);

      if (!person) {
        const notFoundError = new NotFoundError(`No person with id '${id}' found`);
        reject(notFoundError);
      }

      resolve(person);
    });
  }

  async createPerson(person) {
    const data = await this.getPersons();

    return new Promise((resolve, _) => {
      const newPerson = {
        id: uuid.v1(),
        ...person,
      };

      data.push(newPerson);
      const updatedData = { persons: data };

      writeData('./data.json', updatedData);

      resolve(newPerson);
    });
  }

  async updatePerson(id) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === id);

      if (!person) {
        const notFoundError = new NotFoundError(`No person with id '${id}' found`);
        reject(notFoundError);
      }

      person.age = 40;

      resolve(person);
    });
  }

  async deletePerson(id) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === id);

      if (!person) {
        const notFoundError = new NotFoundError(`No person with id '${id}' found`);
        reject(notFoundError);
      }

      const updatedPersons = data.filter((p) => person.id !== p.id);
      const updatedData = { persons: updatedPersons };

      writeData('./data.json', updatedData);

      resolve('Person deleted successfully');
    });
  }
}

module.exports = Controller;
