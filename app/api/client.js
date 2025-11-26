import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.1.22:9000/api",
  timeout: 8000,
});

// 🔥 Interceptor para detectar FormData automaticamente
apiClient.addRequestTransform((request) => {
  if (request.data instanceof FormData) {
    request.headers["Content-Type"] = "multipart/form-data";
  }
});

export default apiClient;
