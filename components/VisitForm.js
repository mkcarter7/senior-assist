import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { getSenior, updateSenior } from '../api/seniorData';
import { createVisit, updateVisits } from '../api/visitsData';
import { useAuth } from '../utils/context/authContext';

// from firebase data
const initialState = {
  Senior_id: '',
  notes: '',
  time: '',
  Personal_care_id: '',
};
// function
function VisitForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [Senior, setSenior] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  // use effect
  useEffect(() => {
    getSenior(user.uid).then(setSenior);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  // handles the change and submit
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
      updateSenior(formInput).then(() => router.push(`/Seniors/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createVisit(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateVisits(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Visits</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Visit" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Visit Details"
          name="visit"
          value={formInput.Visit}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT
      <FloatingLabel controlId="floatingInput2" label="Book Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel> */}

      {/* PRICE INPUT
      <FloatingLabel controlId="floatingInput3" label="Book Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel> */}

      {/* Senior Select  */}
      <FloatingLabel controlId="floatingSelect" label="Senior">
        <Form.Select
          aria-label="Senior"
          name="Senior_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.Senior_id}
          required
        >
          <option value="">Select a Senior</option>
          {
            Senior.map((senior) => (
              <option
                key={Senior.firebaseKey}
                value={Senior.firebaseKey}
              >
                {senior.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* VISIT DETAILS
      <FloatingLabel controlId="floatingTextarea" label="visit details" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="visit details"
          style={{ height: '100px' }}
          name="visit details"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
 */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Visit</Button>
    </Form>
  );
}

VisitForm.propTypes = {
  obj: PropTypes.shape({
    Senior_id: PropTypes.string,
    notes: PropTypes.string,
    time: PropTypes.string,
    personal_care_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

VisitForm.defaultProps = {
  obj: initialState,
};

export default VisitForm;
