import { useEffect, useState } from 'react';

const Location = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);
  return (
    <div>
      <h1>Location</h1>
      <p>{JSON.stringify(location, null, 2)}</p>
    </div>
  );
};

export default Location;
