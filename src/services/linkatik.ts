import axios from "axios";
import { getSession } from "../utils/get-session";
import { logout } from "../utils/logout";

const baseURL = "https://back-dev-project.linkatik.com/api";

// Create an Axios instance
const LinkatikApi = axios.create({
  baseURL: baseURL + "/admin",
});
// Create an Axios instance
export const LinkatikApiGuest = axios.create({
  baseURL: baseURL + "/user",
});

// Add a request interceptor to include the authentication token
LinkatikApi.interceptors.request.use(
  async (config) => {
    const session = getSession();

    // turn URLSearchParams to object , and handle arrays
    if (config.params && config.params instanceof URLSearchParams) {
      const paramsObject: Record<string, unknown> = {};
      for (const [key, value] of config.params.entries()) {
        if (key.endsWith("[]")) {
          //  for arrays
          paramsObject[key.slice(0, -2)] = value.split(",").filter(Boolean);
        } else {
          // Otherwise, just assign the value
          paramsObject[key] = value;
        }
      }

      config.params = paramsObject;
    }

    if (session && session.token) {
      config.headers["Authorization"] = `Bearer ${session.token}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
// Add a request interceptor to include the authentication token
LinkatikApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

// Add a request interceptor to include the authentication token
LinkatikApiGuest.interceptors.request.use(
  async (config) => {
    console.log("🚀 ~ config:", config.baseURL, config.url, config.data);

    return config;
  },
  async (error) => {
    // Do something with request error

    return Promise.reject(error);
  }
);

export default LinkatikApi;
