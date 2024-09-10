// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import { deleteSingleSenior } from '../api/seniorData';

// function SeniorCard({ seniorObj, onUpdate }) {
//   // FOR DELETE, WE NEED TO REMOVE THE SENIOR AND HAVE THE VIEW RERENDER,
//   const deleteThisSenior = () => {
//     if (window.confirm(`Delete ${seniorObj.Senior_id}?`)) {
//       deleteSingleSenior(seniorObj.firebaseKey).then(() => onUpdate());
//     }
//   };

//   return (
//     <Card style={{ width: '18rem', margin: '10px' }}>
//       <Card.Body>
//         <Card.Title>{seniorObj.Senior_id}</Card.Title>
//         {/* DYNAMIC LINK TO VIEW THE SENIOR DETAILS  */}
//         <Link href={`/Senior/${seniorObj.firebaseKey}`} passHref>
//           <Button variant="primary" className="m-2">VIEW</Button>
//         </Link>
//         {/* DYNAMIC LINK TO EDIT THE SENIOR DETAILS  */}
//         <Link href={`/Senior/edit/${seniorObj.firebaseKey}`} passHref>
//           <Button variant="info">EDIT</Button>
//         </Link>
//         <Button variant="danger" onClick={deleteThisSenior} className="m-2">
//           DELETE
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }

// SeniorCard.propTypes = {
//   visitObj: PropTypes.shape({
//     Senior_id: PropTypes.string,
//     notes: PropTypes.string,
//     time: PropTypes.string,
//     personal_care_id: PropTypes.string,
//     firebaseKey: PropTypes.string,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default SeniorCard;
