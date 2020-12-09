import React, { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoad } from "./LazyLoad";
import Loading from './Loading';
import Error from './Error';
import "../styles/component/vehicle.scss";

interface VehicleProps {
  id: string;
  modelYear: string;
  url: string;
  media: Media[];
}

interface Media {
  name: string;
  url: string;
}

interface VehicleInfo {
  id: string;
  description: string;
  price: number;
}

interface Props {
  vehicle: VehicleProps;
}

const VehicleDetail: React.FC<Props> = ({ vehicle }) => {
  const [vehicleInfo, setVehicleInfo] = useState <VehicleInfo> ({ id: "", description: "", price: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchVehicleInfo = async () => {
      try {
        const { data } = await axios.get(`/api/vehicle/${vehicle.id}`);
        if(mounted){
          setVehicleInfo(data);
          setLoading(true);
        }
      } catch (err) {
        setError(err);
        setVehicleInfo({ id: "", description: "", price: 0 });
        setLoading(true);
      }
    };
    fetchVehicleInfo();

    return ()=>{
      mounted = false;
    }
  }, [vehicle.id]);

  if (!vehicleInfo || !vehicle || !loading) {
    return <Loading message={'Loading data...'}/>;
  }

  if (error) {
    return <Error message={`Error Ocuured: ${error}`}/>;
  }

  const media = vehicle.media[0];

  return (
    <div data-testid="resolved-vehicle-data" className='vehicle'>
      <div className='media'>
        <LazyLoad src={media.url} alt={vehicleInfo.id} />
      </div>
      <div className='info'>
        <div className='header'>
          <h2>{media.name}</h2>
        </div>
        <div className='price'>From: {vehicleInfo.price}</div>
        <div className='description'>{vehicleInfo.description}</div>
      </div>
    </div>
  );
};

export default VehicleDetail;
