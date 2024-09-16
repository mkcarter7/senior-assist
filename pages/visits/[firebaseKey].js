import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getVisitsDetails } from '../../api/mergedData';

export default function ViewVisit() {
  // Set a state for visit
  const [visitDetails, setVisitDetails] = useState({});
  // Call Router Hook
  const router = useRouter();
  // grab firebaseKey from url
  const { firebaseKey } = router.query;
  // make call to API layer to get the data
  useEffect(() => {
    getVisitsDetails(firebaseKey).then(setVisitDetails);
  }, [firebaseKey]);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <h5>
            {visitDetails.seniorObject?.name}
            {visitDetails.seniorObject?.notes}
          </h5>
          <p>{visitDetails.notes || ''}</p>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
