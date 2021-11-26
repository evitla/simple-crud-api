const data = require('./data');

class Controller {
  async getPeople() {
    return new Promise((resolve, _) => resolve(data));
  }

  async getPerson(id) {
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === parseInt(id));
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
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === parseInt(id));

      if (!person) {
        reject(`No person with id ${id} found`);
      }

      person.age = 40;

      resolve(person);
    });
  }

  async deletePerson(id) {
    return new Promise((resolve, reject) => {
      let person = data.find((person) => person.id === parseInt(id));

      if (!person) {
        reject(`No person with id ${id} found`);
      }

      resolve('Person deleted successfully');
    });
  }
}

module.exports = Controller;
