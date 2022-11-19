import axios from "axios";

type DevModes = "dev" | "prod";
const mode: DevModes = "prod";

const prefix =
  mode === "prod"
    ? "https://us-central1-brunellhack.cloudfunctions.net/"
    : "http://localhost:5001/brunellhack/us-central1/";

export const getMessages = (lat: number, lon: number, radius: number) => {
  return axios.post(`${prefix}messages`, {
    "lon": lon,
    "lat": lat,
    "radius": radius,
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
