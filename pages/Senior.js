import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSenior } from '../api/seniorData';
import { useAuth } from '../utils/context/authContext';
import AuthorCard from '../components/SeniorCard';

function Showseniors() {
  // Set a state for seniors
  const [seniors, setSenior] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the senior
  const getAllTheSeniors = () => {
    getSenior(user.uid).then(setSenior);
  };

  // make the call to the API to get all the seniors on component render
  useEffect(() => {
    getAllTheSeniors();
  });

  return (
    <div className="text-center my-4">
      <Link href="/author/new" passHref>
        <Button>Add A Senior</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over seniors here using seniorCard component */}
        {seniors.map((senior) => (
          <AuthorCard key={senior.firebaseKey} authorObj={senior} onUpdate={getAllTheSeniors} />
        ))}
      </div>
    </div>
  );
}

export default Showseniors;
