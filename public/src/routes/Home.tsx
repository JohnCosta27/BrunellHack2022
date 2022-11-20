import ReactSlider from 'react-slider';
import { createContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { getMessages, MessageType } from '@/api/api';
import Send from './Send';
import Map from './map';

export const RADIUS = 2000;

export const MessagesContext = createContext<MessageType[]>([]);

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [location, setLocation] = useState({ lat: 0.1, lon: 0.1 });
  const [locationLoaded, setLocationLoaded] = useState(0);
  const [radius, setRadius] = useState(RADIUS);
  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
      console.log('Updating Location');
      setLocationLoaded(locationLoaded + 1);
    });
  }, []);

  useEffect(() => {
    if (locationLoaded > 0) {
      getMessages(location.lat, location.lon, radius).then((r) => {
        setMessages(r.data);
      });
    }
  }, [locationLoaded, radius]);

  return (
    <MessagesContext.Provider value={messages}>
      <div className="flex justify-center w-full flex-col bg-[#FAFAFA]">
        <Map radius={radius} messages={messages} />
        <div className="flex flex-col gap-8 justify-center items-center w-full mt-4">
          <h1 className="text-5xl text-center">Near Me (20 meters)</h1>
          <button
            className="text-5xl bg-white p-4 rounded shadow-lg"
            onClick={() => setLocationLoaded(locationLoaded + 1)}
          >
            Refetch!
          </button>
          <div className="w-3/4 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
            {messages.map((m) => (
              <>
                {m.messages.map((message) => {
                  // check if the message is a deso address
                  let desoAddress = '';
                  if (message.payload.includes('|')) {
                    desoAddress = message.payload.split('|')[1];
                    // remove deso stuff from payload
                    message.payload = message.payload.split('\nDeso Address: |')[0];
                  }
                  return (
                    <div className="bg-white shadow-lg rounded-lg p-6 text-2xl break-all">
                      {message.payload}
                      {(desoAddress !== '') && (
                      <a href={`https://explorer.deso.org/address/${desoAddress}`} target="_blank" rel="noreferrer">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          View or donate to this address!
                        </button>
                      </a>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
          <Send
            lat={location.lat}
            lon={location.lon}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
      <div>
        <ReactSlider
          className="horizontal-slider"
          defaultValue={RADIUS}
          max={2000}
          thumbClassName="example-thumb"
          trackClassName="example-track"
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          onAfterChange={(e) => {
            setRadius(e);
          }}
        />
      </div>
    </MessagesContext.Provider>
  );
};
export default Home;
