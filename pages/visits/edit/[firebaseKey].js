import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleVisit } from '../../../api/visitsData';
import VisitForm from '../../../components/VisitForm';

export default function EditVisit() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the visit data
  useEffect(() => {
    getSingleVisit(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return (<VisitForm obj={editItem} />);
}
