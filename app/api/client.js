import { create } from "apisauce";
import cache from "../utilities/cache";

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

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }
  const data = await cache.get(url);
  if (data) {
    return { ok: true, data };
  }
  return response;
};

export default apiClient;
