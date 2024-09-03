import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import VisitCard from '../components/VisitCard';
import { getVisits } from '../api/visitsData';
import { useAuth } from '../utils/context/authContext';

function ShowVisits() {
  // state for visits
  const [visits, setVisits] = useState([]);

  // user ID using useAuth Hook
  const { user } = useAuth();

  // function that makes the API call to get all the books
  const getAllTheVisits = () => {
    getVisits(user.uid).then(setVisits);
  };

  // call to API to get all the books on component render
  useEffect(() => {
    getAllTheVisits();
  });

  return (
    <div className="text-center my-4">
      <Link href="/visit/new" passHref>
        <Button>Add A Visit</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {visits.map((visit) => (
          <VisitCard key={visit.firebaseKey} visitObj={visit} onUpdate={getAllTheVisits} />
        ))}
      </div>
    </div>
  );
}

export default ShowVisits;
