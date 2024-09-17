import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;
// GET SENIORS
const getSenior = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Senior?orderBy="uid"&equalTo="${uid}"`, {
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

// CREATE SENIOR
const createSenior = () => {};

//  GET SINGLE SENIOR
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

// DELETE SENIOR
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

// UPDATE SENIOR
const updateSenior = () => {};

// GET A SINGLE SENIOR VISITS
const getSeniorVisits = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Visits.json?orderBy="senior_id"&equalTo="${firebaseKey}"`, {
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
