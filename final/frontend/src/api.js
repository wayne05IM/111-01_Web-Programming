import axios from 'axios';
let url = "http://localhost:4000/api"
if(window.location.host != "localhost:3000")
  url = "https://shadowverse-toolbox-production.up.railway.app/api"
const instance = axios.create({
  //baseURL: "http://localhost:4000/api",
  baseURL: url
});

export default instance;