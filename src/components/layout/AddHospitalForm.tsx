import { useState } from "react";
import axios from "axios";
import EditableImage from "./EdidableImage";
import File from "./File";

interface AddHospitalFormProps {
  onSuccess: (hospital: any) => void;
  usermail: string | null | undefined;
}

interface Hospital {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  district: string;
  state: string;
  avgBedPrice: number;
  totalBeds: number;
  bedsAvailable: number;
  doc: string;
  verified: boolean;
  ownerMail: string;
  phoneNumber: string;
}

const AddHospitalForm = ({ onSuccess, usermail }: AddHospitalFormProps) => {
  const [image, setImage] = useState('');
  const [doc, setDoc] = useState('');
  const [newHospital, setNewHospital] = useState<Hospital>({
    id: 0,
    name: '',
    image: '',
    latitude: 0,
    longitude: 0,
    address: '',
    city: '',
    district: '',
    state: '',
    avgBedPrice: 0,
    totalBeds: 0,
    bedsAvailable: 0,
    doc: '',
    verified: false,
    ownerMail: '',
    phoneNumber: ''
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
      // Get the latitude and longitude by calling the API route
      const geoResponse = await axios.get(`/api/geocode?address=${encodeURIComponent(newHospital.address+newHospital.city+newHospital.district+newHospital.state)}`);
      const { lat, lng } = geoResponse.data;

      // Set the latitude and longitude in the newHospital object
      const hospitalWithCoordinates = {
        ...newHospital,
        latitude: lat,
        longitude: lng,
        doc: doc,
        image: image,
        ownerMail: usermail || ''
      };

      // Send the updated hospital data to the backend
      const response = await axios.post('/api/hospital', hospitalWithCoordinates);
      onSuccess(response.data);
      setNewHospital({
        id: 0,
        name: '',
        image: '',
        latitude: 0,
        longitude: 0,
        address: '',
        city: '',
        district: '',
        state: '',
        avgBedPrice: 0,
        totalBeds: 0,
        bedsAvailable: 0,
        doc: '',
        verified: false,
        ownerMail: '',
        phoneNumber: ''
      });
      setImage('');
      setDoc('');
    } catch (error) {
      console.error('Error adding hospital:', error);
    }
  };

  return (
    <div className="mt-8 flex gap-2">
      <div>
        <div className="p-2 rounded-lg relative">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="grow">
        <div>
          <label>
            Hospital Name:
            <input type="text" name="name" value={newHospital.name} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Street Address:
            <input type="text" name="address" value={newHospital.address} onChange={handleInputChange} required />
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
        <div>
          <File link={doc} setLink={setDoc} />
        </div>
        <div>
          <label>
            Total Beds:
            <input type="number" name="totalBeds" value={newHospital.totalBeds} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Available Beds:
            <input type="number" name="bedsAvailable" value={newHospital.bedsAvailable} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Average Bed Price:
            <input type="number" name="avgBedPrice" value={newHospital.avgBedPrice} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={newHospital.phoneNumber} onChange={handleInputChange} required />
          </label>
        </div>
        <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">
          Add Hospital
        </button>
      </form>
    </div>
  );
};

export default AddHospitalForm;
