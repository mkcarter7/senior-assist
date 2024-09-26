import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMedicine } from '../../../api/medicineData';
import MedicineForm from '../../../components/VisitForm';

export default function EditMedicine() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the visit data
  useEffect(() => {
    getSingleMedicine(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return (<MedicineForm obj={editItem} />);
}
