import { useState } from "react";
import axios from "axios";
import File from "./File";
import { Hospital } from "@/app/hospital/page";
import EditableImage from "./EdidableImage";

interface AddHospitalFormProps {
  onSuccess: (hospital: any) => void;
  usermail: string | null | undefined;
}

const specialtiesList = [
  "Cardiologist", "Neurologist", "Oncologist", "Endocrinologist",
  "Rheumatologist", "Gastroenterologist", "Pulmonologist", "Nephrologist",
  "Dermatologist", "Hematologist", "Allergist", "Urologist",
  "Infectious Disease Specialist", "Ophthalmologist", "Otolaryngologist (ENT)",
  "Psychiatrist", "Orthopedic Surgeon", "Anesthesiologist", "Pathologist",
  "General Surgeon"
];

const AddHospitalForm = ({ onSuccess, usermail }: AddHospitalFormProps) => {
  const [image, setImage] = useState('');
  const [doc, setDoc] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
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
    phoneNumber: '',
    specialties: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHospital({
      ...newHospital,
      [name]: value
    });
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSpecialties(prev =>
      checked ? [...prev, value] : prev.filter(specialty => specialty !== value)
    );
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Get the latitude and longitude by calling the API route
      const geoResponse = await axios.get(`/api/geocode?address=${encodeURIComponent(newHospital.name+newHospital.address + newHospital.city + newHospital.district + newHospital.state)}`);
      const { lat, lng } = geoResponse.data;

      // Set the latitude and longitude in the newHospital object
      const hospitalWithCoordinates = {
        ...newHospital,
        latitude: lat,
        longitude: lng,
        doc: doc,
        image: image,
        ownerMail: usermail || '',
        specialties: specialties // Add this line
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
        phoneNumber: '',
        specialties: []
      });
      setImage('');
      setDoc('');
      setSpecialties([]);
    } catch (error) {
      console.error('Error adding hospital:', error);
    }
  };

  return (
    <div className="mt-8 flex gap-8">
      <form onSubmit={handleFormSubmit} className="w-2/3 grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block">
            Hospital Name:
            <input type="text" name="name" value={newHospital.name} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div className="col-span-2">
          <label className="block">
            Street Address:
            <input type="text" name="address" value={newHospital.address} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div>
          <label className="block">
            City:
            <input type="text" name="city" value={newHospital.city} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div>
          <label className="block">
            District:
            <input type="text" name="district" value={newHospital.district} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div>
          <label className="block">
            State:
            <input type="text" name="state" value={newHospital.state} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div>
          <label className="block">
            Phone Number:
            <input type="text" name="phoneNumber" value={newHospital.phoneNumber} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div>
          <label className="block">
            Total Beds:
            <input type="number" name="totalBeds" value={newHospital.totalBeds} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div>
          <label className="block">
            Available Beds:
            <input type="number" name="bedsAvailable" value={newHospital.bedsAvailable} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div className="col-span-2">
          <label className="block">
            Average Bed Price:
            <input type="number" name="avgBedPrice" value={newHospital.avgBedPrice} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded" required />
          </label>
        </div>
        <div className="col-span-2">
          <label className="block">
            Specialties:
            <div className="mt-1 grid grid-cols-2 gap-2">
              {specialtiesList.map((specialty, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name="specialties"
                    value={specialty}
                    checked={specialties.includes(specialty)}
                    onChange={handleSpecialtyChange}
                    className="mr-2"
                  />
                  {specialty}
                </label>
              ))}
            </div>
          </label>
        </div>
        <button type="submit" className="col-span-2 bg-primary text-white p-2 rounded mt-4">Add Hospital</button>
      </form>
      <div className="w-1/3 flex flex-col gap-4 p-2">
        <div className="p-2 rounded-lg relative">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="p-2 rounded-lg relative">
          <File link={doc} setLink={setDoc} />
        </div>
      </div>
    </div>
  );
};

export default AddHospitalForm;
