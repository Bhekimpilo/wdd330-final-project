import axios from "axios";

const API_KEY = "ae47dafdb0c0924661af519771812100";
const BASE_URL = "http://api.positionstack.com/v1/forward";

/**
 * Fetch coordinates for an address
 * @param {string} address
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export async function getCoordinates(address) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: API_KEY,
        query: address,
        limit: 1,
      },
    });

    const data = response.data?.data[0];
    return data;
  } catch (error) {
    return null;
  }
}
