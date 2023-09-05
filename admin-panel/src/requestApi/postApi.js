// import axios
import axios from "axios";

// baseurl
import { baseURL, defaultTimeout } from "../config/config.js";

// default axios configuration
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = defaultTimeout;

export default async function postApi(endpoint, payload, dispatch) {
  try {
    const response = await axios.post(endpoint, payload);
    return response.data;
  } catch (e) {
    console.log("error", e.data);

    return e.response.data.error;
  }
}
