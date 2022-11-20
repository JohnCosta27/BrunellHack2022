import React, {
  useEffect, useState, useContext,
} from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, useMap, LayerGroup, Circle,LayersControl
} from 'react-leaflet';
import './styles.css';
import { useMapEvents } from 'react-leaflet/hooks';
import L from 'leaflet';

let radiusCircle;

const SetLocation = ({ radius,position,setPosition }) => {
  
  const map = useMapEvents({
    click() {
      map.locate();
      console.log('Map located');
    }
  });

  console.log("Something Something")
  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      console.log("radius from set loc "+radius)
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const accuracyRadius = e.accuracy;
      const accuracyCircle =  L.circle(e.latlng, accuracyRadius);
      accuracyCircle.addTo(map);
      
    });
  }, [map,radius]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const Map = ({radius,messages}) => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });
  
  return (

  <div className="w-full flex justify-center items-center">
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '90vw', height: '90vh', overflowX: 'hidden' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="fixed"
      />
      <SetLocation radius={radius} position={position} setPosition={setPosition}/>
      <Circle
        center={position}
        pathOptions={{ fillColor: 'green' }}
        radius={radius}
      />
      {messages.map(m=>(
        <Marker position={{lat:m.lat,lng:m.lon}}>
        <Popup>{m.messages[0].payload}</Popup>
        {console.log(m)}
      </Marker>
      ))}
    </MapContainer>
  </div>
)};

export default Map;
