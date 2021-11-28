const path = require('path');
const fs = require('fs');

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
      const person = data.find((person) => person.id === parseInt(id));
      if (person) resolve(person);
      else reject(`No person with id ${id} found`);
    });
  }

  async createPerson(person) {
    return new Promise((resolve, _) => {
      let newPerson = {
        id: Math.floor(4 + Math.random() * 10),
        ...person,
      };

      console.log(newPerson);

      resolve(newPerson);
    });
  }

  async updatePerson(id) {
    const data = await this.getPersons();

    return new Promise((resolve, reject) => {
      const person = data.find((person) => person.id === parseInt(id));

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
      const person = data.find((person) => person.id === parseInt(id));

      if (!person) {
        reject(`No person with id ${id} found`);
      }

      resolve('Person deleted successfully');
    });
  }
}

module.exports = Controller;
