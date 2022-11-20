import axios from 'axios';

type DevModes = 'dev' | 'prod';
const mode: DevModes = 'prod';

export type MessageType = {
  message: string;
  lon: number;
  lat: number;
  radius?: number;
}

const prefix = mode === 'prod'
  ? 'https://us-central1-brunellhack.cloudfunctions.net/'
  : 'http://localhost:5001/brunellhack/us-central1/';

export const getMessages = (lat: number, lon: number, radius: number) => axios.post(`${prefix}messages`, {
  lon,
  lat,
  radius,
});

export const postMessage = (message: string, lon: number, lat: number) => axios.post(`${prefix}createDrop`, {
  lon,
  lat,
  message,
});

export const helloWorld = () => axios.get(`${prefix}helloWorld`);
