import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:9000/api",
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGUxMDA1ODg1NTQ2NjNiZTEyMDJlMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczNzYwNzIzNywiZXhwIjoxNzU0ODg3MjM3fQ.7kjwb3LR3bzxOQFLShwVmmFVl4BZzArROXufA_EmwGE`;
  }
  return config;
});

export default Axios;
