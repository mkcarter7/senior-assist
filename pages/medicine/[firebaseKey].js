import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewMedicineDetails } from '../../api/medicineData';

export default function ViewMedicine() {
  // Set a state for visit
  const [medicineDetails, setMedicineDetails] = useState({});
  // Call Router Hook
  const router = useRouter();
  // grab firebaseKey from url
  const { firebaseKey } = router.query;
  // make call to API layer to get the data
  useEffect(() => {
    viewMedicineDetails(firebaseKey).then(setMedicineDetails);
  }, [firebaseKey]);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <h5>
            {medicineDetails.name}
          </h5>
          <h5>
            {medicineDetails.medine}
          </h5>
          <h5>
            {medicineDetails.dosage}
          </h5>
          <h5>
            {medicineDetails.directions}
          </h5>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
