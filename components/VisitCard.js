import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteVisits } from '../api/visitsData';

function VisitCard({ visitObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE VISIT AND HAVE THE VIEW RERENDER,
  const deleteThisVisit = () => {
    if (window.confirm(`Delete ${visitObj.name}?`)) {
      deleteVisits(visitObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px', backgroundColor: '#365b6d' }}>
      <Card.Body>
        <Card.Title>{visitObj.name}</Card.Title>
        <Card.Title>{visitObj.time_logged}</Card.Title>
        <Card.Title>{visitObj.notes}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE VISIT DETAILS  */}
        <Link href={`/visits/${visitObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE VISIT DETAILS  */}
        <Link href={`/visits/edit/${visitObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisVisit} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

VisitCard.propTypes = {
  visitObj: PropTypes.shape({
    Senior_id: PropTypes.string,
    name: PropTypes.string,
    notes: PropTypes.string,
    time_logged: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VisitCard;
