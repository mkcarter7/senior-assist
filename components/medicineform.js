import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { createMedicine, updateMedicine } from '../api/medicineData';
import { useAuth } from '../utils/context/authContext';
import { getSenior } from '../api/seniorData';

// from firebase data
const initialState = {
  Senior_id: '',
  medicine: '',
  dosage: '',
  directions: '',
};
// function
function MedicineForm({ obj }) {
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
      updateMedicine(formInput).then(() => router.push(`/medicine/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMedicine(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMedicine(patchPayload).then(() => {
          router.push('/medicine');
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Medicine</h2>

      {/* SENIOR SELECT  */}
      {/* FORM INPUTS */}
      <FloatingLabel controlId="floatingSelect" label="Senior">
        <Form.Select
          aria-label="senior"
          name="name"
          onChange={handleChange}
          className="mb-3"
          value={formInput.name}
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
      {/* MEDICINE */}
      <FloatingLabel controlId="floatingTextarea" label="medicine" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="medicine"
          style={{ height: '100px' }}
          name="medicine"
          value={formInput.medicine}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DOSAGE */}
      <FloatingLabel controlId="floatingTextarea" label="dosage" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="dosage"
          style={{ height: '100px' }}
          name="dosage"
          value={formInput.dosage}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DIRECTIONS */}
      <FloatingLabel controlId="floatingTextarea" label="directions" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="directions"
          style={{ height: '100px' }}
          name="directions"
          value={formInput.dosage}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Medicine</Button>
    </Form>
  );
}
//  TELLS COMPONENT WHAT TO EXPECT
MedicineForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    medicine: PropTypes.string,
    dosage: PropTypes.string,
    directions: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
//  CHECKS FOR ERROS
MedicineForm.defaultProps = {
  obj: initialState,
};

export default MedicineForm;
