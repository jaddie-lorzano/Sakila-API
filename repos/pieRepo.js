import { readFile, writeFile } from 'fs';

const FILE_NAME = './assets/pies.json';

let pieRepo = {
  get: function (resolve, reject) {
    readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let pie = JSON.parse(data).find(p => p.id == id);
        resolve(pie);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let pies = JSON.parse(data);
        // Perform search
        if (searchObject) {
          pies = pies.filter(
            p => (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name) >= 0 : true));
        }
  
        resolve(pies);
      }
    });
  },
  insert: function (newData, resolve, reject) {
    readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let pies = JSON.parse(data);
        pies.push(newData);
        writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
          if (err) {
            reject(err);
          }
          else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let pies = JSON.parse(data);
        let pie = pies.find(p => p.id == id);
        if (pie) {
          Object.assign(pie, newData);
          writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: function (id, resolve, reject) {
    readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let pies = JSON.parse(data);
        let index = pies.findIndex(p => p.id == id);
        if (index != -1) {
          pies.splice(index, 1);
          writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(index);
            }
          });
        }
      }
    });
  }  
};

export default pieRepo;