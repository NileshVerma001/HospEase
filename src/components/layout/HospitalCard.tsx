// src/components/HospitalCard.tsx
import { useState } from "react";
import axios from "axios";
import { Hospital } from "@/app/hospital/page"; // Adjust the import path as necessary

interface HospitalCardProps {
  hospital: Hospital;
  onEdit: (id: string, data: { avaiblebeds: number; totalbeds: number; avgprice: number }) => void;
}

const HospitalCard = ({ hospital, onEdit }: HospitalCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [availableBeds, setAvailableBeds] = useState(hospital.avaiblebeds);
  const [totalBeds, setTotalBeds] = useState(hospital.totalbeds);
  const [avgPrice, setAvgPrice] = useState(hospital.avgprice);

  const handleSave = async () => {
    const data = { avaiblebeds: availableBeds, totalbeds: totalBeds, avgprice: avgPrice };
    try {
      await axios.put('/api/hospital', { id: hospital.id, ...data });
      onEdit(hospital.id, data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating hospital:', error);
    }
  };

  return (
    <div className="flex bg-white shadow-lg rounded-lg p-4 mb-4">
      <img src={hospital.image} alt={hospital.name} className="w-32 h-32 object-cover rounded-lg" />
      <div className="ml-4">
        <h2 className="text-xl font-bold color-primary">{hospital.name}</h2>
        <p>{hospital.streatadd}, {hospital.city}, {hospital.state}</p>
        <p>{hospital.ownermail}</p>
        <div className="mt-2">
          {isEditing ? (
              <>
            <div>
                <label>
                    Avaiable Beds
                    <input
                        type="number"
                        value={availableBeds}
                        onChange={(e) => setAvailableBeds(Number(e.target.value))}
                        className="border p-1 mb-2 w-full"
                        placeholder="Available Beds"
                    />
                    
                </label>
            </div>
            <div>
                <label>
                    Total Beds
                    <input
                        type="number"
                        value={totalBeds}
                        onChange={(e) => setTotalBeds(Number(e.target.value))}
                        className="border p-1 mb-2 w-full"
                        placeholder="Total Beds"
                    />

                </label>
            </div>
            <div>
                <label>
                    Average Price
                    <input
                        type="number"
                        value={avgPrice}
                        onChange={(e) => setAvgPrice(Number(e.target.value))}
                        className="border p-1 mb-2 w-full"
                        placeholder="Average Cost per Bed"
                    />

                </label>
            </div>
              <button type="submit" onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p>Available Beds: {hospital.avaiblebeds}</p>
              <p>Total Beds: {hospital.totalbeds}</p>
              <p>Average Cost per Bed: ${hospital.avgprice}</p>
              <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
