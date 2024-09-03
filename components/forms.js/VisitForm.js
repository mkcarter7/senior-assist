import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createVisit, updateVisits } from '../../api/visitsData';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  id: '',
  Senior_id: '',
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
    setSeniors(user.uid).then(setSeniors);
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
      updateVisits(formInput).then(() => router.push(`/visit/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createVisit(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateVisits(patchPayload).then(() => {
          router.push('/visits');
        });
      });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Price"
            name="price"
            value={formInput.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Select
          name="author_id"
          onChange={handleChange}
          value={formInput.author_id}
          required
        >
          <option value="">Select An Author</option>

          {
          seniors.map((author) => (
            <option
              key={author.firebaseKey}
              value={author.firebaseKey}
            >
              {author.first_name} {author.last_name}
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
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    author_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

VisitForm.defaultProps = {
  obj: intialState,
};

export default VisitForm;
