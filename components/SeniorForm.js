import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { createSenior, updateSenior } from '../api/seniorData';
import { useAuth } from '../utils/context/authContext';

// from firebase data
const initialState = {
  Senior_id: '',
  diagnosis: '',
};
// function
function SeniorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  // use effect
  useEffect(() => {
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
      updateSenior(formInput).then(() => router.push(`/Senior/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSenior(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateSenior(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Veterinarian</h2>
      {/* SENIOR NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Senior Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Senior Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Senior</Button>
    </Form>
  );
}

SeniorForm.propTypes = {
  obj: PropTypes.shape({
    Senior_id: PropTypes.string,
    notes: PropTypes.string,
    time: PropTypes.string,
    personal_care_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

SeniorForm.defaultProps = {
  obj: initialState,
};

export default SeniorForm;
