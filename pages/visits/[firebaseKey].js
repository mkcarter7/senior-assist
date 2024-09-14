import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleVisit } from '../../api/visitsData';

export default function ViewVisit() {
  // Set a state for visit
  const [visitDetails, setVisitDetails] = useState({});
  // Call Router Hook
  const router = useRouter();
  // grab firebaseKey from url
  const { firebaseKey } = router.query;
  // make call to API layer to get the data
  useEffect(() => {
    getSingleVisit(firebaseKey).then(setVisitDetails);
  }, [firebaseKey]);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <h5>
            {visitDetails.senior_obj.notes}
            {visitDetails.senior_obj.time}
          </h5>
          <p>{visitDetails.notes || ''}</p>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
