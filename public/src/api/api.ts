import axios from "axios";

type DevModes = "dev" | "prod";
const mode: DevModes = "dev";

const prefix =
  mode === "prod"
    ? "https://us-central1-brunellhack.cloudfunctions.net/"
    : "http://localhost:5001/brunellhack/us-central1/";

export const getMessages = () => {
  return axios.post(`${prefix}messages`, {
    "lon": 0.1,
    "lat": 0.1,
    "radius": 1000000
  });
};

export const postMessage = (message: string, lon: number, lat: number) => {
  return axios.post(`${prefix}createDrop`, {
    lon: lon,
    lat: lat,
    message: message,
  });
};

export const helloWorld = () => {
  return axios.get(`${prefix}helloWorld`);
}
