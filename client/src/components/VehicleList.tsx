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
    let mounted = true;
    const fetchVehicles = async () => {
      try{
        const { data } = await axios.get("/api/vehicle");
        if(mounted){
          setVehicles(data.vehicles);
          setLoading(true);  
        }
      }catch(err){
        setError(err);
        setLoading(true);
        setVehicles([]);
      }
    };
    fetchVehicles();
    return ()=>{
      mounted = false;
    }
  }, []);

  if(!loading){
    return <Loading message={'Loading data...'}/>
  }

  if(error){
    return <Error message={`Error occured while loading data: ${error}`}/>
  }
  
  return (
      <div data-testid="vehicleList" className="vehicle-list-container">
        { vehicles.map((vehicle) => (<Vehicle key={vehicle.id} vehicle={vehicle} />))}
      </div>
  );
};

export default VehicleList;
