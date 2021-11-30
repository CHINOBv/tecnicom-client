import axios from "axios";
import { apiUrl } from "../vars";

const fetchApi = axios.create({
  baseURL: apiUrl + "/api",
});

export default fetchApi;
