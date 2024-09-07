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

  const handleCareToggle = () => {
    setFormInput((prev) => ({ ...prev, care: !prev.care }));
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

      {/* TITLE INPUT
      <FloatingLabel controlId="floatingInput1" label="Visit" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Visit Details"
          name="visit"
          value={formInput.Visit}
          onChange={handleChange}
          required
        />
      </FloatingLabel> */}

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
      {/* Date/Time Entry */}
      <FloatingLabel controlId="floatingTextarea" label="Date/Time" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Date Time"
          style={{ height: '100px' }}
          name="Date Time"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Visit Entry */}
      <FloatingLabel controlId="floatingTextarea" label="Visit Details" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="visit details"
          style={{ height: '100px' }}
          name="Visit Details"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* personal Care drop down */}
      {/* <FloatingLabel controlId="floatingSelect" label="Personal Care">
        <Form.Select
          aria-label="Personal Care"
          name="Personal Care"
          onChange={handleChange}
          className="mb-3"
          value={formInput.personal_care_id}
          required
        >
          <option value="">Select Personal Care</option>
          <option value="Bath">Bath</option>
          <option value="Clean Teeth">Clean Teeth</option>
          <option value="Foot Cream">Foot Cream</option>
          <option value="Cut Nails">Cut Nails</option>
        </Form.Select>
      </FloatingLabel> */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="care"
        name="care"
        label="care?"
        checked={formInput.Personal_care_idersonal_care_id}
        onChange={handleCareToggle}
      />

      {formInput.care && (
        <FloatingLabel controlId="floatingInput3" label="Peronal Care" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Personal care"
            name="personal care"
            value={formInput.personal_care_id}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      )}

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
