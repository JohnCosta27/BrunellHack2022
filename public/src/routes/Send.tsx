import { getMessages, postMessage } from "@/api/api";
import { FC, useEffect, useState } from "react";
import { RADIUS } from "./Home";

const Send: FC<{
  lat: number;
  lon: number;
  messages: string[];
  setMessages: (a: string[]) => void;
}> = ({ lat, lon, messages, setMessages }) => {
  const [message, setMessage] = useState("");

  const submitMessage = () => {
    postMessage(message, lon, lat);
    setMessages([...messages, { messages: [{ payload: message }] }]);
  };

  return (
    <div>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <textarea
            id="comment"
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            onClick={submitMessage}
          >
            Post comment
          </button>
          <div className="flex pl-0 space-x-1 sm:pl-2">
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Set location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;
