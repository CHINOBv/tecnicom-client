import axios, { AxiosRequestConfig } from "axios";

const fetchInstagram = axios.create({
  baseURL: "https://graph.instagram.com/v12.0",
});

fetchInstagram.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const access_token = await localStorage.getItem("accessToken");
  if (access_token) {
    config.params = {
      ...config.params,
      access_token,
    };
  }
  return config;
});

export default fetchInstagram;
