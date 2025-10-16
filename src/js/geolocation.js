const API_KEY = "a847532d1cd9e2b70dbecb541d4d1fb5";
const BASE_URL = "https://api.positionstack.com/v1/forward";


export async function getCoordinates(place) {
  const url = `${BASE_URL}?access_key=${API_KEY}&query=${encodeURIComponent(place)}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.data || data.data.length === 0) return null;

  return {
    name: data.data[0].name,
    country: data.data[0].country,
    latitude: data.data[0].latitude,
    longitude: data.data[0].longitude
  };
}