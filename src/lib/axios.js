import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://ieee-enrollments-backend.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;