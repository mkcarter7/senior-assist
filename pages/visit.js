import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getVisits } from '../api/visitsData';
import { useAuth } from '../utils/context/authContext';
import VisitCard from '../components/VisitCard';

function ShowVisits() {
  // Set a state for visits
  const [Visits, setVisits] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the vi
  const getAllTheVisits = () => {
    getVisits(user.uid).then(setVisits);
  };

  // make the call to the API to get all the visits on component render
  useEffect(() => {
    getAllTheVisits();
  });

  return (
    <div className="text-center my-4">
      <Link href="visits/new" passHref>
        <Button>Add A Visit</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over visits here using visitCard component */}
        {Visits.map((visit) => (
          <VisitCard key={visit.firebaseKey} visitObj={visit} onUpdate={getAllTheVisits} />
        ))}
      </div>
    </div>
  );
}

export default ShowVisits;
