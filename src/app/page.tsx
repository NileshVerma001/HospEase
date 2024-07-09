import HospList from "@/components/layout/HospList";

const hospitals = [
  {
    id: 1,
    name: "Hospital A",
    bedsAvailable: 20,
    avgBedPrice: 100,
    latitude: 12.9716,
    longitude: 77.5946,
    address: "Address A",
    phoneNumber: "123-456-7890",
    totalBeds: 50,
  },
  {
    id: 2,
    name: "Hospital B",
    bedsAvailable: 30,
    avgBedPrice: 150,
    latitude: 19.0760,
    longitude: 72.8777,
    address: "Address B",
    phoneNumber: "987-654-3210",
    totalBeds: 60,
  },
  // Add more hospitals as needed
];

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-4">List of Hospitals</h1>
      <HospList hospitals={hospitals} />
    </div>
  );
}
