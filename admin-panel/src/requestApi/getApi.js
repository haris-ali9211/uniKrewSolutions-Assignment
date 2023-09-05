// import axios
import axios from "axios";

// baseurl
import { baseURL, defaultTimeout } from "../config/config";

// default axios configuration
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = defaultTimeout;

const getApi = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export default getApi;
