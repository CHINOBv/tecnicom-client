import axios from "axios";
import { apiUrl } from "../vars";

const fetchMedias = axios.create({
  baseURL: apiUrl + "/api/ig",
});

fetchMedias.interceptors.request.use(async (config) => {
  const access_token = await localStorage.getItem("accessToken");
  const user_id = await localStorage.getItem("userId");
  if (access_token && user_id) {
    config.params = {
      ...config.params,
      access_token,
      user_id,
    };
  }
  return config;
});

export default fetchMedias;
