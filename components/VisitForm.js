import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createVisit, updateVisits } from '../api/visitsData';
import { getSenior } from '../api/seniorData';

const intialState = {
  id: 0,
  name: '',
  notes: '',
  time_logged: '',
  personal_care_id: '',
};
function VisitForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [seniors, setSeniors] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getSenior(user.uid).then(setSeniors);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateVisits(formInput).then(() => router.push(`/Visits/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createVisit(payload).then(({ id }) => {
        const patchPayload = { firebaseKey: id };

        updateVisits(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="Notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Notes"
            name="notes"
            value={formInput.notes}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Select
          name="personal_care_id"
          onChange={handleChange}
          value={formInput.personal_care_id}
          required
        >
          <option value="">Select A Personal Care Item</option>

          {
          seniors.map((senior) => (
            <option
              key={senior.firebaseKey}
              value={senior.firebaseKey}
            >
              {senior.first_name} {senior.last_name}
            </option>
          ))
        }

        </Form.Select>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.DropDown
            type="switch"
            label="personal_care"
            name="personal care"
            checked={formInput.sale}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                sale: e.target.checked,
              }));
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Note' : 'Submit Note'}
        </Button>
      </Form>
    </>
  );
}

VisitForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    notes: PropTypes.string,
    time_logged: PropTypes.string,
    personal_care_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

VisitForm.defaultProps = {
  obj: intialState,
};

export default VisitForm;
