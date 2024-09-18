import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// API CALL TO GET VISITS
const getVisits = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Visits.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// API CALL TO DELETE VISITS
const deleteVisits = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Visits/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE VISITS
const createVisit = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Visits.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE VISITS
const updateVisits = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Visits/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE VISIT
const getSingleVisit = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Visits/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET VISIT BY SENIOR
const getVisitsBySenior = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Visits.json?orderBy="uid"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getVisits,
  createVisit,
  deleteVisits,
  updateVisits,
  getSingleVisit,
  getVisitsBySenior,
};
