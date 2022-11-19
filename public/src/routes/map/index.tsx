import { LatLngExpression } from 'leaflet';
import React, { useEffect, useReducer, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, useMap,
} from 'react-leaflet';
import './styles.css';
import { useMapEvent, useMapEvents } from 'react-leaflet/hooks';

const SetLocation = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const Map = () => (
  <div className="h-screen w-full">
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="fixed"
      />
      <SetLocation />
    </MapContainer>
  </div>
);

/* const [gotLocation, setGotLocation] = useState(false);
  const [location, setLocation] = useState<LatLngExpression>({ lat: 0, lng: 0 });

  useEffect(() => {
    window.requestAnimationFrame(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        // if (position.coords.latitude !== location.lat || position.coords.longitude !== location.lng) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // }
        setGotLocation(true);
      });
    });
  }, [location]);

  return (
    <div className="h-80 w-50">
      {gotLocation && (
      <MapContainer center={location} zoom={13} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>
            A pretty CSS3 popup.
            {' '}
            <br />
            {' '}
            Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      ) }
    </div>
  ); */

export default Map;

/**
 *     <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
		<TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			className="absolute"
    />

    <Marker position={[49.8397, 24.0297]} />
			const position = [51.505, -0.09];
	return (
	<div className='h-80 w-50'>
  <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width: '100%', height: '100%'}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>

      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer></div>)
};
 */
