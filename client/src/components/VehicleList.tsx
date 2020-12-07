import React, { useState, useEffect } from "react";
import axios from "axios";
import Vehicle from "./Vehicle";
import "../styles/component/vehicleList.scss"

interface Vehicles {
  id:string;
  modelYear:string;
  url: string;
  media: [];
}
const VehicleList:React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);

  useEffect(() => {
    const getVehicles = async () => {
      const { data } = await axios.get("/api/vehicle");
      setVehicles(data.vehicles);
    };
    getVehicles();

    return () => {
      getVehicles();
    };
  }, []);

  const renderVehicles = vehicles.map((vehicle) => (
      <Vehicle key={vehicle.id} vehicle={vehicle} />
  ));
  
  return (
      <div className="vehicle-list-container">{renderVehicles}</div>
  );
};

export default VehicleList;
