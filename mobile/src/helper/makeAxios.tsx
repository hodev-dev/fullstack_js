import { AxiosInstance } from "axios";
import { AxiosFactory } from "./Axios";

const makeAxios = (): AxiosInstance => {
  const AxiosClass = new AxiosFactory();
  const Axios: AxiosInstance = AxiosClass.createInstance();
  AxiosClass.setBaseURL();
  AxiosClass.authRefresh();
  return Axios;
}

export default makeAxios;