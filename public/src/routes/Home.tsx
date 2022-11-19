import { getMessages } from "@/api/api";
import { useEffect, useState } from "react";
import Send from "./Send";

export const RADIUS = 20;

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [location, setLocation] = useState({ lat: 0.1, lon: 0.1 });
  const [locationLoaded, setLocationLoaded] = useState(0);

  navigator.geolocation.watchPosition((pos) => {
    setLocation({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
    console.log("Updating Location");
    setLocationLoaded(locationLoaded + 1);
  });

  useEffect(() => {
    if (locationLoaded > 0) {
      getMessages(location.lat, location.lon, RADIUS).then((r) => {
        setMessages(r.data);
      });
    }
  }, [locationLoaded]);

  return (
    <div className="flex justify-center w-full p-16">
      <div className="w-3/4 flex flex-col gap-8">
        <h1 className="text-5xl text-white">Near Me</h1>
          <div className="w-full grid grid-cols-3 gap-4">
            {messages.map((m) => (
              <>
                {m.messages.map((message) => <div className="bg-white p-4 text-2xl">{message.payload}</div>)}
              </>
            ))}
          </div>
        <Send lat={location.lat} lon={location.lon} messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};
export default Home;
