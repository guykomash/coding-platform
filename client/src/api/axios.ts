import axios from 'axios';
const baseURL: string = import.meta.env.VITE_SERVER_API_URL;

export default axios.create({
  baseURL: baseURL,
});
