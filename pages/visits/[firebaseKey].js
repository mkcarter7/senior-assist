import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewVisitDetails } from '../../api/visitsData';

export default function ViewVisit() {
  // Set a state for visit
  const [visitDetails, setVisitDetails] = useState({});
  // Call Router Hook
  const router = useRouter();
  // grab firebaseKey from url
  const { firebaseKey } = router.query;
  // make call to API layer to get the data
  useEffect(() => {
    viewVisitDetails(firebaseKey).then(setVisitDetails);
  }, [firebaseKey]);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <h5>
            {visitDetails.name}
          </h5>
          <h5>
            {visitDetails.notes}
          </h5>
          <h5>
            {visitDetails.time_logged}
          </h5>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
