/* eslint-disable @next/next/no-img-element */
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
        <div className="d-flex flex-column">
          <img src={visitDetails.image} alt={visitDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {visitDetails.title} by {visitDetails.authorObject?.first_name} {visitDetails.seniorObject?.last_name}
            {visitDetails.seniorObjectObject?.favorite ? '🤍' : ''}
          </h5>
          Author Email: <a href={`mailto:${visitDetails.authorObject?.email}`}>{visitDetails.authorObject?.email}</a>
          <p>{visitDetails.description || ''}</p>
          <br />
        </div>
        <br />
        <p>
          {visitDetails.sale ? `🏷️ Sale $${visitDetails.price}` : `$${visitDetails.price}` }
        </p>
      </div>
    </>
  );
}
