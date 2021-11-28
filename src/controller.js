const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

class Controller {
  async getPersons() {
    return new Promise((resolve, _) => {
      fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err) throw err;
        resolve(JSON.parse(data).persons);
      });
    });
  }

  async getPerson(id) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === id);
      if (person) resolve(person);
      else reject(`No person with id ${id} found`);
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

      const updatedData = {
        persons: data,
      };

      fs.writeFile(
        path.join(__dirname, 'data.json'),
        JSON.stringify(updatedData),
        'utf-8',
        (err) => {
          if (err) throw err;
        },
      );

      resolve(newPerson);
    });
  }

  async updatePerson(id) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === id);

      if (!person) {
        reject(`No person with id ${id} found`);
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
        reject(`No person with id ${id} found`);
      }

      const updatedPersons = data.filter((p) => person.id !== p.id);
      const updatedData = {
        persons: updatedPersons,
      };

      fs.writeFile(
        path.join(__dirname, 'data.json'),
        JSON.stringify(updatedData),
        'utf-8',
        (err) => {
          if (err) throw err;
        },
      );

      resolve('Person deleted successfully');
    });
  }
}

module.exports = Controller;
