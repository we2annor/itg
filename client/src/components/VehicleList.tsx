import React, { useState, useEffect } from "react";
import axios from "axios";
import Vehicle from "./Vehicle";
import Loading from './Loading';
import Error from './Error';
import "../styles/component/vehicleList.scss"

interface Vehicles {
  id:string;
  modelYear:string;
  url: string;
  media: [];
}
const VehicleList:React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [error, setError]=useState(null);
  const [loading, setLoading]=useState(false)

  useEffect(() => {
    const getVehicles = async () => {
      try{
        const { data } = await axios.get("/api/vehicle");
        setVehicles(data.vehicles);
        setLoading(true);
      }catch(err){
        setError(err);
        setLoading(true);
        setVehicles([]);
      }
    };
    getVehicles();
  }, []);

  const renderVehicles = vehicles.map((vehicle) => (
      <Vehicle key={vehicle.id} vehicle={vehicle} />
  ));

  if(!loading){
    return <Loading message={'Loading...'}/>
  }

  if(error){
    return <Error message={`Error occured: ${error}`}/>
  }
  
  return (
      <div className="vehicle-list-container">{renderVehicles}</div>
  );
};

export default VehicleList;
