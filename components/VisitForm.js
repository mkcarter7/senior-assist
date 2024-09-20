import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { createVisit, updateVisits } from '../api/visitsData';
import { useAuth } from '../utils/context/authContext';
import { getSenior } from '../api/seniorData';

// from firebase data
const initialState = {
  Senior_id: '',
  notes: '',
  time_logged: '',
};
// function
function VisitForm({ obj }) {
  // SETS INITIAL STATE TO HOLD THE FORM DATA, THE FORM INPUT UPDATES THE FORM WITH THE NEW DATA
  const [formInput, setFormInput] = useState(initialState);
  // HOOK THAT ALLOWS YOU TO ACCESS ROUTING AND LETS YOU ROUTE TO A NEW PAGE
  const router = useRouter();
  // HOOK ACCESS THE CURRENT USER INFORMATION AND STORES IT
  const { user } = useAuth();
  //  GET SENIOR FOR DROPDOWN
  const [seniors, setSeniors] = useState([]);
  // USE EFFECT CHECKS IF THE OBJ HAS A FIREBASEKEY, UPDATES STATE AND WHEN INPUT OR USER CHANGES
  useEffect(() => {
    getSenior(user.uid).then(setSeniors);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  // HANDLES FORM INPUT CHANGES AND UPDATES IT WHILE KEEPING EVERYTHING ELSE THE SAME
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //  UPDATES EXISTING DATA AND ADDS NEW DATA BASED ON USER
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateVisits(formInput).then(() => router.push(`/visits/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createVisit(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateVisits(patchPayload).then(() => {
          router.push('/visit');
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Visits</h2>

      {/* SENIOR SELECT  */}
      {/* FORM INPUTS */}
      <FloatingLabel controlId="floatingSelect" label="Senior">
        <Form.Select
          aria-label="senior"
          name="Senior_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.Senior_id}
          required
        >
          <option value="">Select Senior</option>
          {seniors.map((senior) => (
            <option
              key={senior.senior_id}
              value={senior.senior_id}
            >
              {senior.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      {/* Date/Time Entry */}
      <FloatingLabel controlId="floatingTextarea" label="time" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="time"
          style={{ height: '100px' }}
          name="time"
          value={formInput.time}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Visit Entry */}
      <FloatingLabel controlId="floatingTextarea" label="notes" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="notes"
          style={{ height: '100px' }}
          name="notes"
          value={formInput.notes}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Visit</Button>
    </Form>
  );
}
//  TELLS COMPONENT WHAT TO EXPECT
VisitForm.propTypes = {
  obj: PropTypes.shape({
    senior_id: PropTypes.string,
    notes: PropTypes.string,
    time_logged: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
//  CHECKS FOR ERROS
VisitForm.defaultProps = {
  obj: initialState,
};

export default VisitForm;
