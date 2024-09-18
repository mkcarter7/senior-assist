import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSenior = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Senior.json?orderBy="id"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE Senior
const createSenior = () => {};

//  GET SINGLE senior
const getSingleSenior = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Senior/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE senior
const deleteSingleSenior = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Senior/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE senior
const updateSenior = () => {};

// GET A SINGLE senior visits
const getSeniorVisits = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Visits.json?orderBy="id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getSenior,
  createSenior,
  getSingleSenior,
  deleteSingleSenior,
  updateSenior,
  getSeniorVisits,
};
