import { useEffect, useState } from "react";
import axios from "axios";
import HospitalCard from "../components/HospitalCard";

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      const res = await axios.get("http://localhost:5000/api/hospital");

      setHospitals(res.data);
    };

    fetchHospitals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-8">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">
        Available Hospitals
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital._id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}

export default Hospitals;
