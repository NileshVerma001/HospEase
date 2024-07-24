import { useState } from "react";
import axios from "axios";
import EditableImage from "./EdidableImage";
import File from "./File";
import Map from "../map";

interface AddHospitalFormProps {
  onSuccess: (hospital: any) => void;
  usermail: string | null | undefined;
}

const AddHospitalForm = ({ onSuccess, usermail }: AddHospitalFormProps) => {
  const [image, setImage] = useState('');
  const [doc, setDoc] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [newHospital, setNewHospital] = useState({
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
        doc: doc,
        image: image,
        ownermail: usermail
      });
      onSuccess(response.data);
      setNewHospital({
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
        doc: ''
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
          const { latitude, longitude } = position.coords;
          setNewHospital({
            ...newHospital,
            latitude,
            longitude
          });
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error detecting location:', error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="mt-8 flex gap-4">
      <div className="w-1/2">
        <Map hospitals={[newHospital]} highlightedHospitalId={null} userLocation={userLocation} />
      </div>
      <div className="w-1/2">
        <div className="p-2 rounded-lg relative">
          <EditableImage link={image} setLink={setImage} />
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
          <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">
            Add Hospital
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHospitalForm;
