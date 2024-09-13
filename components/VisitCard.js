import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteVisits } from '../api/visitsData';

function VisitCard({ visitObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE VISIT AND HAVE THE VIEW RERENDER,
  const deleteThisVisit = () => {
    if (window.confirm(`Delete ${visitObj.Senior_id}?`)) {
      deleteVisits(visitObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{visitObj.Senior_id}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE VISIT DETAILS  */}
        <Link href={`/Visit/${visitObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE VISIT DETAILS  */}
        <Link href={`/Visit/edit/${visitObj.firebaseKey}`} passHref>
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
    Senior_id: PropTypes.number,
    notes: PropTypes.string,
    time: PropTypes.string,
    personal_care_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VisitCard;
