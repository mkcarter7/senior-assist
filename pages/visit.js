/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getVisits } from '../api/visitsData';
import { useAuth } from '../utils/context/authContext';
import VisitCard from '../components/VisitCard';

function ShowVisits() {
  // Set a state for books
  const [Visits, setVisits] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the books
  const getAllTheVisits = () => {
    getVisits(user.uid).then(setVisits);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheVisits();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/new" passHref>
        <Button>Add A Visit</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over books here using BookCard component */}
        {Visits.map((visit) => (
          <VisitCard key={visit.firebaseKey} visitObj={visit} onUpdate={getAllTheVisits} />
        ))}
      </div>
    </div>
  );
}

export default ShowVisits;
