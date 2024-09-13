/* eslint-disable @next/next/no-img-element */
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
        <div className="d-flex flex-column">
          <img src={visitDetails.image} alt={visitDetails.senior_id} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {visitDetails.senior_id} by {visitDetails.visitObject?.name} {visitDetails.seniorObject?.last_name}
            {visitDetails.seniorObject?.favorite ? '🤍' : ''}
          </h5>
          Author Email: <a href={`mailto:${visitDetails.seniorObject?.email}`}>{visitDetails.seniorObject?.email}</a>
          <p>{visitDetails.notes || ''}</p>
          <br />
        </div>
        <br />
        <p>
          {visitDetails.time ? `🏷️ Time $${visitDetails.time}` : `$${visitDetails.time}` }
        </p>
      </div>
    </>
  );
}
