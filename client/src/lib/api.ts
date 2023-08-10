import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Create an axios instance that points to the API url
export const api = axios.create({
  baseURL: API_URL,
});
