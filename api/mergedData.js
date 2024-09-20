import { getSingleVisit, getVisits } from './visitsData';

const viewVisitDetails = (visitFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleVisit(visitFirebaseKey), getVisits(visitFirebaseKey)])
    .then(([visitObject, visitsSeniorArray]) => {
      resolve({ ...visitObject, visit: visitsSeniorArray });
    }).catch((error) => reject(error));
});
export {
  getVisits, viewVisitDetails,
};
