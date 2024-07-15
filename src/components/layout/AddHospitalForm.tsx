import { useState } from "react";
import axios from "axios";
import EditableImage from "./EdidableImage";
import File from "./File"

interface AddHospitalFormProps {
  onSuccess: (hospital: any) => void;
  usermail: string | null | undefined;
}

const AddHospitalForm = ({ onSuccess, usermail }: AddHospitalFormProps) => {
  const [image, setImage] = useState('');
  const [doc,setDoc]=useState('');
  const [newHospital, setNewHospital] = useState({
    name: '',
    image: '',
    latitude: 0,
    longitude: 0,
    streatadd: '',
    city: '',
    district: '',
    state: '',
    avgprice: 0,
    totalbeds: 0,
    avaiblebeds: 0,
    doc: ''
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
        doc:doc,
        image: image,
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
        state: '',
        avgprice: 0,
        totalbeds: 0,
        avaiblebeds: 0,
        doc:''
      });
      setImage('');
    } catch (error) {
      console.error('Error adding hospital:', error);
    }
  };

  const handleLatandLong = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewHospital({
            ...newHospital,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error detecting location:', error);
        },
        { enableHighAccuracy: true } // Enable high-accuracy mode
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="mt-8 flex gap-2 ">
      <div>
        <div className="p-2 rounded-lg relative">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="grow">
        <div>
          <label>
            Name:
            <input type="text" name="name" value={newHospital.name} onChange={handleInputChange} required />
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <div>
              <label>
                Latitude:
                <input type="number" name="latitude" disabled value={newHospital.latitude} onChange={handleInputChange} required />
              </label>
            </div>
            <div>
              <label>
                Longitude:
                <input type="number" name="longitude" disabled value={newHospital.longitude} onChange={handleInputChange} required />
              </label>
            </div>
          </div>
          <div>
            <button onClick={handleLatandLong} type="button">Detect Coordinates</button>
          </div>
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
        <div>
          <File link={doc} setLink={setDoc}/>
        </div>
        <div>
          <label>
            Total Beds:
            <input type="number" name="totalbeds" value={newHospital.totalbeds} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Available Beds:
            <input type="number" name="avaiblebeds" value={newHospital.avaiblebeds} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Average Bed Price:
            <input type="number" name="avgprice" value={newHospital.avgprice} onChange={handleInputChange} required />
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
