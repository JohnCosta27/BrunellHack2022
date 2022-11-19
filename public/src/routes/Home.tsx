import { getMessages } from "@/api/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages().then((r) => setMessages(r.data));
  }, []);

  navigator.geolocation.getCurrentPosition((pos) => console.log(pos));

  return (
    <div className="flex justify-center w-full p-16">
      <div className="w-3/4 flex flex-col">
        <h1 className="text-5xl text-white">Locations</h1>
        <div className="w-full flex flex-col gap-4">
          {messages.map((m) => (
            <div className="w-full bg-blue-800 rounded text-white text-2xl p-4 flex flex-col items-center gap-4">
              {m.hash}
              <div className="w-1/2 flex flex-col">
                {m.messages.map((message) => (
                  <p>{message.payload}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
