import axios from "axios";

const client = axios.create();
const baseURL = "http://localhost:1337";

client.defaults.baseURL = baseURL;
client.defaults.withCredentials = true;

export default client;
