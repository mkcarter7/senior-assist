/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleSenior } from '../api/seniorData';

function SeniorCard({ seniorObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE author AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE authorS
  const deleteSenior = () => {
    if (window.confirm(`Do you want to delete ${seniorObj.Senior_id}?`)) {
      deleteSingleSenior(seniorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{seniorObj.Senior_id}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE senior DETAILS  */}
        <Link href={`/Senior/${seniorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE author DETAILS  */}
        <Link href={`/Senior/edit/${seniorObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteSenior} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

SeniorCard.propTypes = {
  seniorObj: PropTypes.shape({
    Senior_id: PropTypes.string,
    notes: PropTypes.string,
    time: PropTypes.string,
    personal_care_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SeniorCard;
