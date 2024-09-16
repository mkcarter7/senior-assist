import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSeniorDetails } from '../../api/mergedData';
import VisitCard from '../../components/VisitCard';

export default function ViewSenior() {
  const [seniorDetails, setSeniorDetails] = useState({});

  // Call Router Hook
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getSDetails = () => {
    getSeniorDetails(firebaseKey).then(setSeniorDetails);
  };

  //   make call to API layer to get the data
  useEffect(() => {
    getSeniorDetails(firebaseKey).then(setSeniorDetails);
  }, [firebaseKey]);

  return (
    <div>{seniorDetails.visits?.map((visit) => (
      <VisitCard key={visit.firebaseKey} visitObj={visit} onUpdate={getSDetails} />
    ))}
    </div>
  );
}
