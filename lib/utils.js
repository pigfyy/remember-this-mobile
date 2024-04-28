import axios from "axios";

/**
 * Asynchronously sends a POST request to the specified route with the given data using axios.
 *
 * @param {string} route - The API route to which the request is sent. This should be appended to the base URL.
 * @param {Object} data - The payload to be sent with the request. This object is converted to a JSON string.
 * @returns {Promise<Object>} A promise that resolves to the response data if the request is successful.
 * @throws {Error} Throws an error if the request fails, logging the error to the console.
 */
const queryApi = async (route, payload) => {
  try {
    const response = await axios.post(
      `http://192.168.68.75:3000${route}`,
      payload
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error querying response:", error);
    return null; // Return null or handle error appropriately
  }
};

export { queryApi };
