import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// API CALL TO GET Medicine
const getMedicine = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medicine.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// API CALL TO DELETE medicine
const deleteMedicine = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medicine/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE medicine
const createMedicine = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medicine.json`, {
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

// UPDATE Medicine
const updateMedicine = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medicine/${payload.firebaseKey}.json`, {
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

// GET SINGLE medicine
const getSingleMedicine = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medicine/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
//  VIEW medicine DETAILS
const viewMedicineDetails = (medicineFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMedicine(medicineFirebaseKey), getMedicine(medicineFirebaseKey)])
    .then(([medicineObject, medicineSeniorsArray]) => {
      resolve({ ...medicineObject, medicine: medicineSeniorsArray });
    }).catch((error) => reject(error));
});
// GET medicine BY SENIOR
const getMedicineBySenior = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medicine.json?orderBy="uid"&equalTo="${firebaseKey}"`, {
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
  getMedicine,
  createMedicine,
  deleteMedicine,
  updateMedicine,
  getSingleMedicine,
  getMedicineBySenior,
  viewMedicineDetails,
};
