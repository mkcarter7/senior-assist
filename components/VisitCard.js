import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteVisits } from '../api/visitsData';

function VisitCard({ visitObj, onUpdate }) {
  const deleteAVisit = () => {
    if (window.confirm(`Do you want to delete ${visitObj.notes}?`)) {
      deleteVisits(visitObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={visitObj.notes} alt={visitObj.notes} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{visitObj.notes}</Card.Title>
        <Link href={`/visit/${visitObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/book/edit/${visitObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteAVisit} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

VisitCard.propTypes = {
  visitObj: PropTypes.shape({
    notes: PropTypes.string,
    time_logged: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VisitCard;
