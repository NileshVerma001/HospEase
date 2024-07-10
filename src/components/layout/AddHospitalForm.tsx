import { useState } from "react";
import axios from "axios";

interface AddHospitalFormProps {
  onSuccess: (hospital: any) => void;
  usermail: string | null | undefined;
}

const AddHospitalForm = ({ onSuccess, usermail }: AddHospitalFormProps) => {
  const [newHospital, setNewHospital] = useState({
    name: '',
    image: '',
    latitude: 0,
    longitude: 0,
    streatadd: '',
    city: '',
    district: '',
    state: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHospital({
      ...newHospital,
      [name]: value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/hospital', {
        ...newHospital,
        ownermail: usermail
      });
      onSuccess(response.data);
      setNewHospital({
        name: '',
        image: '',
        latitude: 0,
        longitude: 0,
        streatadd: '',
        city: '',
        district: '',
        state: ''
      });
    } catch (error) {
      console.error('Error adding hospital:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="mt-4">
      <div>
        <label>
          Name:
          <input type="text" name="name" value={newHospital.name} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input type="text" name="image" value={newHospital.image} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Latitude:
          <input type="number" name="latitude" value={newHospital.latitude} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Longitude:
          <input type="number" name="longitude" value={newHospital.longitude} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Street Address:
          <input type="text" name="streatadd" value={newHospital.streatadd} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          City:
          <input type="text" name="city" value={newHospital.city} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          District:
          <input type="text" name="district" value={newHospital.district} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          State:
          <input type="text" name="state" value={newHospital.state} onChange={handleInputChange} required />
        </label>
      </div>
      <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">
        Add Hospital
      </button>
    </form>
  );
};

export default AddHospitalForm;
