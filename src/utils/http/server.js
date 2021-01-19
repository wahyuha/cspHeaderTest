import axios from "axios";
import { apiUrlServer } from "@constants/url";

class httpServer {

  constructor(session) {
    this.apiUrl;
    this.headers = {};
    this.instance;
    this.session = session;
    this.timeout = 120000;

    this
      .createApiUrl()
      .createHeaders()
      .createInstance()
      .requestInterceptor()
      .responseInterceptor();
  }

  createApiUrl() {
    this.apiUrl = apiUrlServer;
    return this;
  }

  createHeaders() {
    const requestId = this.session.requestId;
    if (requestId) {
      this.headers = {
        "X-Request-ID": requestId,
      };
    }
    return this;
  }

  addHeaders(headers) {
    this.headers = {
      ...this.headers,
      ...headers,
    };
    return this;
  }

  createInstance() {
    this.instance = axios.create({
      baseURL: this.apiUrl,
      timeout: this.timeout,
      headers: this.headers,
    });
    return this;
  }

  requestInterceptor() {
    this.instance.interceptors.request.use(
      function (config){
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    return this;
  }

  responseInterceptor() {
    this.instance.interceptors.response.use(
      function (response) {

        return response;
      }, 
      function (error) {
        return Promise.reject(error);
      }
    );

    return this;
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, data) {
    return this.instance.post(url, data);
  }
}

export default (session) => {
  async function get(url) {
    return await new httpServer(session).get(url);
  }

  async function post(url, data) {
    return await new httpServer(session).post(url, data);
  }

  return {
    get,
    post,
  };
};
