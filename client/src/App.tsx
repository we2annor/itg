import React from 'react';
import VehicleList from './components/VehicleList';
import './App.scss';

const App: React.FunctionComponent= () =>{
  return (
    <div className="vehicle-list-wrapper">
      <VehicleList />
    </div>
  );
}

export default App;
