import { deleteSingleSenior, getSingleSenior } from './seniorData';
import { deleteVisits, getSingleVisit } from './visitsData';

const getVisitsDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleVisit(firebaseKey).then((visitObj) => {
    getSingleSenior(visitObj.senior_id).then((seniorObject) => {
      resolve({ ...visitObj, seniorObject });
    });
  }).catch(reject);
});

const getSeniorDetails = async (firebaseKey) => {
  const senior = await getSingleSenior(firebaseKey);
  const visits = await getSingleVisit(senior.firebaseKey);

  return { ...senior, visits };
};

const deleteSeniorVisitsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleSenior(firebaseKey).then((seniorsVisitsArray) => {
    const deleteVisitPromises = seniorsVisitsArray.map((visit) => deleteVisits(visit.firebaseKey));

    Promise.all(deleteVisitPromises).then(() => {
      deleteSingleSenior(firebaseKey).then(resolve);
    });
  }).catch(reject);
});
export {
  getSeniorDetails, getVisitsDetails, deleteSeniorVisitsRelationship,
};
