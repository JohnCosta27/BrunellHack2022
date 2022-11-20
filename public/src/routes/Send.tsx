import { FC, useEffect, useState } from 'react';
import { getMessages, postMessage } from '@/api/api';
import { RADIUS } from './Home';

const Send: FC<{
  lat: number;
  lon: number;
  messages: string[];
  setMessages: (a: any[]) => void;
}> = ({
  lat, lon, messages, setMessages,
}) => {
  const [message, setMessage] = useState('');
  const [desoAddress, setDesoAddress] = useState('');

  const submitMessage = () => {
    if (desoAddress.length > 0) {
      postMessage(`${message}\nDeso Address: |${desoAddress}|`, lon, lat);
    } else {
      postMessage(message, lon, lat);
    }

    setMessage('');
    setMessages([
      ...messages,
      { lon, lat, messages: [{ payload: message }] },
    ]);
  };

  return (
    <div className="md:w-3/4 w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
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
      <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <textarea
          id="comment"
          rows={4}
          className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          placeholder="Put in your deso coin address here"
          required
          value={desoAddress}
          onChange={(e) => setDesoAddress(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        <button
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          onClick={submitMessage}
        >
          Post comment
        </button>
      </div>
    </div>
  );
};

export default Send;
