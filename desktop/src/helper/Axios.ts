import axios, { AxiosInstance } from 'axios';

class AxiosFactory {
  instance: AxiosInstance = axios;
  createInstance() {
    this.instance = axios.create({
      withCredentials: true,
    });
    return this.instance;
  }

  CSRF_TOKEN(error: any): Promise<any> {
    console.log({ error })
    const originalRequest = error.config;
    originalRequest._retry = true;
    return this.instance.get('/sanctum/csrf-cookie').then((response: any) => {
      console.log(response.headers['set-cookie']);
      return this.instance(originalRequest);
    });
  }
  setBaseURL() {
    this.instance.interceptors.request.use((config) => {
      const persist: any = localStorage.getItem('persist:root');
      const parsed_persist: any = JSON.parse(persist);
      const http = JSON.parse(parsed_persist.http);
      const parsed_http = JSON.parse(http);
      config.baseURL = parsed_http.server;
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }
  authRefresh() {
    this.instance.interceptors.response.use(function (response) {
      return response;
    }, (error) => {
      if (error.response.status === 419) {
        return this.CSRF_TOKEN(error);
      }
      return Promise.reject(error);
    });
  }
}


export { AxiosFactory };

