const path = require('path');
const fs = require('fs');
const { APIError } = require('./custom-errors');

const getReqData = (req) =>
  new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });

const getData = (filename) =>
  new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), 'utf-8', (err, data) => {
      if (err) {
        const apiError = new APIError('INTERNAL SERVER ERROR');
        reject(apiError);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });

const writeData = (filename, data) =>
  new Promise((_, reject) => {
    fs.writeFile(path.join(__dirname, filename), JSON.stringify(data), 'utf-8', (err) => {
      if (err) {
        const apiError = new APIError('INTERNAL SERVER ERROR');
        reject(apiError);
      }
    });
  });

module.exports = { getReqData, getData, writeData };
