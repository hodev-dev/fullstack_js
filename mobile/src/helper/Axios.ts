import AsyncStorage from '@react-native-community/async-storage';
import axios, { AxiosError, AxiosInstance } from 'axios';
var setCookie = require('set-cookie-parser');

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
    return this.instance.get('/sanctum/csrf-cookie').then(async (response: any) => {
      return this.instance(originalRequest);
    });
  }

  setBaseURL() {
    this.instance.interceptors.request.use(async (config) => {
      const persist: any = await AsyncStorage.getItem('persist:root');
      const parsed_persist: any = JSON.parse(persist);
      const parse_http = JSON.parse(parsed_persist.http);
      const parse_auth = JSON.parse(parsed_persist.auth);
      config.baseURL = parse_http.server;
      console.log('config token', parse_auth.token);
      config.headers.common = { 'Authorization': `Bearer ${parse_auth.token}` };
      config.headers = { "Accept": "application/json" };
      return config;
    }, (error: AxiosError) => {
      return Promise.reject(error);
    });
  }

  authRefresh() {
    this.instance.interceptors.response.use(function (response) {
      return response;
    }, (error: AxiosError) => {
      if (error.response && error.response.status === 419) {
        // return this.CSRF_TOKEN(error);
      }
      if (error.response && error.response.status === 401) {
        // return this.CSRF_TOKEN(error);
        console.log('401')
      }
      return Promise.reject(error);
    });
  }
}


export { AxiosFactory };

